import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
const UpdateBook = () => {
  const { id } = useParams();
  const { updateBook, getSingleBook, singleBook: bookData, } = useAuthContext();
  //  const [bookData,setBookData]=useState({});
  const fetchBook = async () => {
    const data = await getSingleBook(id);
    // setBookData(data);
  }
  useEffect(() => {
    if (id) fetchBook();
  }, [id]);
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('author', bookData.author)
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      // setValue('coverImage', bookData.coverImage)
    }
  }, [bookData, setValue])
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("category", data.category);
    formData.append("trending", data.trending ? true : false);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    // ✅ ONLY append image if user selected one
    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }
    // const updateBookData = {
    //   title: data.title,
    //   description: data.description,
    //   category: data.category,
    //   trending: data.trending,
    //   oldPrice: Number(data.oldPrice),
    //   newPrice: Number(data.newPrice),
    //   coverImage: data.coverImage || bookData.coverImage,
    // };
    try {
      await updateBook(id, formData);
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });

    } catch (error) {
      console.log("Failed to update book.");
      alert("Failed to update book.");
    }
  }
  //if (isLoading) return <Loading />
  if (!bookData) return <div>Loading...</div>;
  //if (isError) return <div>Error fetching book data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />
        <InputField
          label="Author"
          name="author"
          placeholder="Enter book author name"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="file"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook
