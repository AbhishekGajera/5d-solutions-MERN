import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { Row, Col } from "react-bootstrap";
import image from "../../assets/icon/image 1.svg";
import upload from "../../assets/upload.png";
import docs from "../../assets/google-docs.png";
import { formatFileSize, truncateFileName } from "../../utils/helpers";
import { TagsInput } from "react-tag-input-component";
import { createNewMoment } from "../../utils/apiUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Moment = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm();

  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [tagError, setTagError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isFileErrorForLength, isSetfileErrorForLength] = useState(false);

  useEffect(() => {
    setTagError(selectedTags.length === 0);
  }, [selectedTags, isSubmitted]);

  useEffect(() => {
    setFileError(selectedFiles.length === 0);
  }, [selectedFiles, isSubmitted]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current = document.createElement("input");
    fileInputRef.current.type = "file";
    fileInputRef.current.multiple = true;
    fileInputRef.current.accept = "image/*";
    fileInputRef.current.addEventListener("change", handleFileChange);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const MAX_FILE_COUNT = 5;

  const handleFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // Check if adding the files would exceed the maximum file count
    if (selectedFiles.length + imageFiles.length > MAX_FILE_COUNT) {
      setFileError(true);
      isSetfileErrorForLength(true);
      return;
    }

    setFileError(false);
    setSelectedFiles((prevFiles) => [...prevFiles, ...imageFiles]);
    setValue("file", (prevFiles) => [...prevFiles, ...imageFiles]);
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener("change", handleFileChange);

      return () => {
        fileInputRef.current.removeEventListener("change", handleFileChange);
      };
    }
  }, []);

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const onSubmit = async (data) => {
    try {
      // Check for tag and file errors before handling the form submission
      if (selectedTags.length === 0 || selectedFiles.length === 0) {
        setTagError(selectedTags.length === 0);
        setFileError(selectedFiles.length === 0);
        return;
      }

      const formData = new FormData();
      formData.append("title", data?.title);

      selectedTags?.map((i) => {
        formData.append("tags", i);
      });

      selectedFiles?.map((i) => {
        formData.append("images", i);
      });

      await createNewMoment(formData);
      toast.success("Moment Created Succssfully!!")
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.errors ||
          error?.response?.data?.message ||
          error?.message
      );
    }
  };

  const onClickDeleteMessage = (index) => {
    const data = selectedFiles?.filter((_, i) => i !== index);
    setSelectedFiles(data);

    if (data?.length < 6) {
      isFileErrorForLength(false);
    }
  };

  return (
    <>
      <div className="content">
        <div className="container-fluid p-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 content-main-layout">
              <h6 className="mb-4">Add new moment</h6>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    aria-describedby="titleHelp"
                    placeholder="Sample title"
                    {...register("title", {
                      required: "Title is required",
                      maxLength: {
                        value: 100,
                        message: "Title cannot exceed 100 characters",
                      },
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.title?.message}
                  </div>
                </div>
                <Row>
                  <Col lg={5} md={6} sm={6} xs={12}>
                    <div className="mb-3">
                      <label htmlFor="tags" className="form-label">
                        Tags
                      </label>
                      <TagsInput
                        value={selectedTags}
                        onChange={setSelectedTags}
                        name="tags"
                        placeHolder="Press Enter to create new Tag"
                        classNames={{ tag: "tag-cls", input: "input-cls" }}
                      />
                      {isSubmitted && tagError && (
                        <div className="invalid-feedback d-block">
                          Please select at least one tag.
                        </div>
                      )}
                    </div>
                    {selectedFiles?.length > 0 && (
                      <div>
                        <h6 className="mb-5">Uploading</h6>
                        <div>
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between upload-file mb-5"
                            >
                              <div className="uplod-img">
                                <img
                                  src={
                                    file.type.startsWith("image/")
                                      ? image
                                      : docs
                                  }
                                  alt="img"
                                />
                              </div>
                              <div>
                                <div>
                                  <div>
                                    <div htmlFor={`file${index}`}>
                                      {truncateFileName(file.name, 20)}{" "}
                                    </div>
                                    <progress
                                      id={`file${index}`}
                                      value="100"
                                      max="100"
                                    >
                                      {" "}
                                      100%{" "}
                                    </progress>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <span>100% done</span>
                                    <span>{formatFileSize(file.size)}</span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="close-icon pointer"
                                onClick={() => onClickDeleteMessage(index)}
                              >
                                <i className="ri-close-line"></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col lg={7} md={6} sm={6} xs={12}>
                    <div
                      className={`uplod-file-img ${
                        isDragging ? "dragging" : ""
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onDragLeave={handleDragLeave}
                    >
                      <img src={upload} alt="uploade" />
                      <p>Drag and drop files here</p>
                      {selectedFiles.length > 0 && (
                        <div>
                          <div>
                            <p>
                              SelectedTags Files count: {selectedFiles?.length}
                            </p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        {...register("file")}
                      />
                      <span>OR</span>
                      <button
                        type="button"
                        className="btn btn-primary submit-btn"
                        onClick={handleClick}
                      >
                        Browse
                      </button>
                      <div className="invalid-feedback">
                        {errors.file?.message}
                      </div>
                    </div>
                    {(isSubmitted || isFileErrorForLength) && fileError && (
                      <div className="invalid-feedback d-block">
                        {isFileErrorForLength
                          ? `Maximum ${MAX_FILE_COUNT} files are allowed`
                          : "Please select at least one file."}
                      </div>
                    )}
                  </Col>
                </Row>
                <div className="submit-main">
                  <button
                    type="submit"
                    className="btn btn-primary content-submit-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moment;
