import { Users, MessageCircle, Heart, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

const POSTS = [
  { author: 'Nguyễn Văn A', time: '2 giờ trước', content: 'Cà phê nhà mình bị đốm lá như này là bệnh gì vậy mọi người?', likes: 12, comments: 5 },
  { author: 'Trần Thị B', time: '5 giờ trước', content: 'Đã chữa thành công bệnh đạo ôn lúa bằng thuốc XYZ, chia sẻ cho bà con tham khảo.', likes: 45, comments: 18 },
  { author: 'Lê Văn C', time: '1 ngày trước', content: 'Sầu riêng rụng trái non nhiều quá, ai có kinh nghiệm chỉ giúp với.', likes: 8, comments: 22 },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Cộng đồng Nông dân</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
            Đăng bài
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-4">
        {POSTS.map((post, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{post.author}</h3>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>
            
            <p className="text-gray-800 text-sm mb-4 leading-relaxed">{post.content}</p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-gray-500">
              <button className="flex items-center space-x-1.5 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-green-500 transition-colors">
                <Share2 size={18} />
                <span className="text-xs font-medium">Chia sẻ</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
