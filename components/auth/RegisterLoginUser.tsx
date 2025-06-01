// "use client";
// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";
// import { Toaster } from "@/components/ui/sonner";
// import { useRouter } from "next/navigation";
// // import { useAppDispatch } from "@/providers/toolkit/hooks/hooks";
// import { registerUser } from "@/(providers)/toolkit/features/REgisterUserSlice";

// interface SignupProps {
//   name: string;
//   email: string;
//   password: string;
// }

// const RegisterLoginUser = () => {
//   const [showPassword, setShowPassword] = useState<Boolean>(false);
//   const [isLogin, setIsLogin] = useState<Boolean>(!false);
//   const [isLoading, setIsLoading] = useState(false);
//   const route = useRouter();
//   // const dispatch = useAppDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<SignupProps>();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = async (data: SignupProps) => {
//     setIsLoading(true);
//     if (isLogin) {
//       try {
//         const user = await signIn("credentials", {
//           redirect: false,
//           email: data.email,
//           password: data.password,
//         });
//         setIsLoading(true);
//         if (user?.error) {
//           toast({
//             title: "Error",
//             description: user.error,
//             duration: 3000,
//             variant: "destructive",
//           });
//         } else {
//           toast({
//             title: "Success",
//             description: "Logged in successfully",
//             duration: 3000,
//             variant: "default",
//             style: {
//               backgroundColor: "#191919",
//               color: "#fff",
//             },
//           });
//           route.push("/");
//         }
//       } catch (error) {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           duration: 3000,
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       try {
//         await dispatch(registerUser(data)).unwrap();
//         reset();
//         setIsLogin(!isLogin);
//       } catch (error) {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Registration failed",
//           duration: 3000,
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-white movingGradient">
//       <div className="bg-white shadow-lg rounded-xl p-8 form-container">
//         <h4 className="text-2xl font-semibold text-blue-gray-900 mb-2">
//           {isLogin ? "Login" : "Sign Up"}
//         </h4>
//         <p className="text-base text-blue-gray-700 mb-4">
//           {isLogin
//             ? "Welcome back! Enter your credentials to log in."
//             : "Nice to meet you! Enter your details to register."}
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
//           {!isLogin && (
//             <div className="mb-4">
//               <label
//                 className="block text-base font-semibold text-blue-gray-900 mb-1"
//                 htmlFor="name"
//               >
//                 Your Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 {...register("name", { required: true })}
//                 className="w-full px-3 py-2 border rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500"
//               />
//               {errors.name && <p className="text-red-500">Name is required</p>}
//             </div>
//           )}
//           <div className="mb-4">
//             <label
//               className="block text-base font-semibold text-blue-gray-900 mb-1"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Please enter a valid email address",
//                 },
//               })}
//               className="w-full px-3 py-2 border rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500">
//                 {errors.email.message || "Email is required"}
//               </p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-base font-semibold text-blue-gray-900 mb-1 relative"
//               htmlFor="password"
//             >
//               Password
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters long",
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
//                     message:
//                       "Password must include an uppercase letter, a lowercase letter, a number, and a special character",
//                   },
//                 })}
//                 className="w-full px-3 py-2 border font-normal rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500 pr-10"
//               />
//               <div
//                 className="absolute inset-y-0 right-0 top-[40%] flex items-center pr-3 cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//               </div>
//             </label>
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//           </div>
//           <button
//             className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 mb-4"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
//           </button>
//           <div className="mt-4 text-base text-blue-gray-700">
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//             <span onClick={toggleForm} className="text-blue-500 cursor-pointer">
//               {isLogin ? "Sign Up" : "Login"}
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterLoginUser;