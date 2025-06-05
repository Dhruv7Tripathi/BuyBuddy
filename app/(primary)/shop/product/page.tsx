// "use client";
// import { useState, FormEvent } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// export default function AddProduct() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState<number | "">("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!title || !description || price === "" || !imageUrl) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     try {
//       await axios.post("/api/products", {
//         title,
//         description,
//         price: Number(price),
//         imageUrl,
//       });
//       router.push("/shop/watches");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add the product.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

//         {error && (
//           <p className="text-red-500 mb-4">{error}</p>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             className="mt-1 w-full p-2 border rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             className="mt-1 w-full p-2 border rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Price</label>
//           <input
//             type="number"
//             className="mt-1 w-full p-2 border rounded"
//             value={price}
//             onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
//             required
//             step="0.01"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Image URL</label>
//           <input
//             type="text"
//             className="mt-1 w-full p-2 border rounded"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }
