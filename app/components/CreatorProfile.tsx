// 'use client';
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { MapPin, Mail, Phone } from "lucide-react";
// import { useRouter } from "next/navigation";

// // ✅ Mock data - replace with actual data fetching
// const getCreatorData = (id: string) => ({
//   id: 1,
//   name: "Travel Explorer",
//   username: "travelexplorer",
//   bio: "Passionate travel creator sharing hidden gems around the world 🌍",
//   avatar: "/assets/creator-1.jpg",
//   location: "Kanpur, India",
//   contact: {
//     email: "contact@travelexplorer.com",
//     phone: "+91 98765 43210"
//   },
//   stats: {
//     followers: "2.5K",
//     following: "356",
//     offers: "48"
//   },
//   recentOffers: [
//     {
//       id: 1,
//       title: "Historic City Walk",
//       location: "Old Kanpur",
//       image: "/assets/offer1.jpg"
//     },
//     // ... more offers
//   ]
// });

// // ✅ Now accepts `id` as a prop instead of `params`
// export default function CreatorProfile({ id }: { id: string }) {
//   const router = useRouter();
//   const creator = getCreatorData(id);

//   if (!creator) return <div>Creator not found</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
//       {/* Back Button */}
//       <div className="container mx-auto px-4 py-6">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-red-500 hover:text-red-600"
//         >
//           ← Back to Discover
//         </button>
//       </div>

//       {/* Profile Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="container mx-auto px-4 py-8"
//       >
//         {/* Cover Section */}
//         <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-red-100 to-orange-100 h-64">
//           <div className="absolute inset-0 bg-black/10" />
//         </div>

//         {/* Main Content */}
//         <div className="relative -mt-24 px-6">
//           {/* Avatar */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="relative w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden"
//           >
//             <Image
//               src={creator.avatar}
//               alt={creator.name}
//               fill
//               className="object-cover"
//             />
//           </motion.div>

//           {/* Profile Info */}
//           <div className="space-y-6 mt-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">{creator.name}</h1>
//               <p className="text-gray-600 text-lg">@{creator.username}</p>
//             </div>

//             <p className="text-gray-700 text-lg max-w-3xl">{creator.bio}</p>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatCard value={creator.stats.followers} label="Followers" color="red" />
//               <StatCard value={creator.stats.following} label="Following" color="orange" />
//               <StatCard value={creator.stats.offers} label="Offers" color="amber" />
//             </div>

//             {/* Contact Section */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
//               <div className="space-y-3">
//                 <ContactItem icon={<MapPin className="w-6 h-6" />} value={creator.location} />
//                 <ContactItem icon={<Mail className="w-6 h-6" />} value={creator.contact.email} />
//                 <ContactItem icon={<Phone className="w-6 h-6" />} value={creator.contact.phone} />
//               </div>
//             </div>

//             {/* Recent Offers */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h2 className="text-xl font-semibold mb-4">Recent Offers</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {creator.recentOffers.map((offer) => (
//                   <OfferCard key={offer.id} offer={offer} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // 📦 Reusable components
// const StatCard = ({ value, label, color }: { value: string, label: string, color: string }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     className={`p-6 rounded-xl bg-${color}-50 text-center`}
//   >
//     <div className={`text-3xl font-bold text-${color}-600`}>{value}</div>
//     <div className={`text-sm text-${color}-800 mt-2`}>{label}</div>
//   </motion.div>
// );

// const ContactItem = ({ icon, value }: { icon: React.ReactNode, value: string }) => (
//   <div className="flex items-center gap-4 text-gray-700">
//     <div className="text-red-500">{icon}</div>
//     <span className="text-lg">{value}</span>
//   </div>
// );

// const OfferCard = ({ offer }: { offer: any }) => (
//   <motion.div
//     whileHover={{ x: 5 }}
//     className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//   >
//     <div className="w-16 h-16 rounded-lg overflow-hidden">
//       <Image
//         src={offer.image}
//         alt={offer.title}
//         width={64}
//         height={64}
//         className="object-cover w-full h-full"
//       />
//     </div>
//     <div>
//       <h3 className="font-medium text-lg">{offer.title}</h3>
//       <p className="text-gray-500 text-sm">{offer.location}</p>
//     </div>
//   </motion.div>
// );
