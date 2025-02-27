import { StarIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { FC, useState } from "react";
import Avatar from "@/shared/Avatar";
import * as Yup from "yup";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationTriangle } from 'react-icons/fa';
interface CommentListingDataType {
  userName: string;
  userId?: string;
  avatar?: string;
  comment: string;
  rating: number;
  carId?: string;
  email?: string;
  _id: string; // Sanity Document ID
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({ className = "", data, hasListingTitle, fetchUpdatedFeedbacks }) => {
 

  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(""); // Track email error message
  const [newComment, setNewComment] = useState(data?.comment || "");
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);
  const packageId = data?.packageId;
  const pckEmail = data?.email;
  const userId = data?.userId;
  const commentId = data?._id;
  console.log(data);
  
  // Handle Email Verification
  const handleVerifyEmail = async () => {
    setEmailError(""); // Reset the error message before checking

    try {
      const response = await fetch("/api/feedback/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsEmailValid(true);
        setIsEmailPopupOpen(false);

        if (actionType === "edit") {
          setIsEditPopupOpen(true);
        } else if (actionType === "delete") {
          setIsDeleteConfirmPopupOpen(true);
        }
      } else {
        setEmailError("Invalid email. Please enter the correct email."); // Set error message
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailError("Error validating email. Please try again.");
    }
  };

  // Handle Update Comment (only after email verification)
  const handleUpdateComment = async () => {
    if (!isEmailValid) {
      toast.error("Please verify your email before updating the comment.");
      return;
    }
  


    try {
      const response = await fetch("/api/feedback/update-comment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: commentId, newComment }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment updated successfully!");
        setIsEditPopupOpen(false); // Close the edit popup
        fetchUpdatedFeedbacks();
      } else {
        toast.error("Failed to update comment.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async () => {
    if (!data?._id) {
      toast.error("Invalid feedback ID.");
      return;
    }

    try {
      const response = await fetch(`/api/feedback/${data._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Comment deleted successfully!");
        setIsDeleteConfirmPopupOpen(false);
        fetchUpdatedFeedbacks();
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Something went wrong.");
    }
  };

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });


  return (
    <div className={`nc-CommentListing flex space-x-4 group relative ${className}`} data-nc-id="CommentListing">
      <div className="pt-0.5">
        <Avatar sizeClass="h-10 w-10 text-lg" radius="rounded-full" userName={data?.userName} imgUrl={""} />
      </div>
      <div className="flex-grow relative">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data?.userName}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">{` review in `}</span>
                  <a href="/">The Lounge & Bar2</a>
                </>
              )}
            </div>
          </div>
          <div className="flex text-yellow-500">{Array.from({ length: 5 }, (_, i) => i < data?.rating ? <StarIcon key={i} className="w-4 h-4 text-yellow-500" /> : "")}</div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">{data?.comment}</span>

        <div className="absolute bottom-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={() => {
            setNewComment(data?.comment || "");  // Set the current comment for editing
            setIsEmailPopupOpen(true); // Open the email verification popup
            setActionType("edit");  // Set the action to 'edit'
          }} className="p-1 text-gray-500 hover:text-blue-500">
            <PencilIcon className="w-4 h-4" />
          </button>

          <button onClick={() => {
            setEmail("");  // Clear email when opening delete popup
            setIsEmailPopupOpen(true);  // Open the email verification popup
            setActionType("delete");  // Set the action to 'delete'
          }} className="p-1 text-gray-500 hover:text-red-500">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>



      {isEmailPopupOpen && (
        <Modal title="Verify Email" onClose={() => setIsEmailPopupOpen(false)}>
        <div className="mb-4 p-4 bg-yellow-200 text-yellow-800 flex items-center rounded">
          <FaExclamationTriangle className="mr-2 text-xl" />
          <p>
            {actionType === "delete"
              ? "Please verify your email to be able to delete your feedback."
              : "Please verify your email to be able to update your feedback."}
          </p>
        </div>
    
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailValidationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await fetch("/api/feedback/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email, packageId, userId }),
              });
    
              const data = await response.json();
    
              if (data.valid) {
                setIsEmailValid(true);
                setIsEmailPopupOpen(false);
                setEmail(values.email);
    
                if (actionType === "edit") {
                  setIsEditPopupOpen(true);
                } else if (actionType === "delete") {
                  setIsDeleteConfirmPopupOpen(true);
                }
              } else {
                setFieldError("email", "Invalid email. Please enter the correct email.");
              }
            } catch (error) {
              console.error("Error validating email:", error);
              setFieldError("email", "Error validating email. Please try again.");
            }
    
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border p-2 w-full"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-2" />
    
              <button
  type="submit"
  className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 w-full"
  disabled={isSubmitting}
>
                {isSubmitting ? "Verifying..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    )}
    
    {/* Edit Comment Popup */}
    {isEditPopupOpen && (
      <Modal title="Edit Comment" onClose={() => setIsEditPopupOpen(false)}>
        <textarea
          className="border p-2 w-full"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleUpdateComment} className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 w-full">
          Update
        </button>
      </Modal>
    )}
    
    {/* Delete Confirmation Popup */}
    {isDeleteConfirmPopupOpen && (
      <Modal title="Confirm Deletion" onClose={() => setIsDeleteConfirmPopupOpen(false)}>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={handleDeleteComment} className="mt-3 bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 transition duration-200 w-full">
          Delete
        </button>
      </Modal>
      )}
    </div>
  );
};

export default CommentListing;
