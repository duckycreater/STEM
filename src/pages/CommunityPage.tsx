import { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_POSTS = [
  { id: 1, author: 'Nguyễn Văn A', time: '2 giờ trước', content: 'Cà phê nhà mình bị đốm lá như này là bệnh gì vậy mọi người?', likes: 12, comments: 5 },
  { id: 2, author: 'Trần Thị B', time: '5 giờ trước', content: 'Đã chữa thành công bệnh đạo ôn lúa bằng thuốc XYZ, chia sẻ cho bà con tham khảo.', likes: 45, comments: 18 },
  { id: 3, author: 'Lê Văn C', time: '1 ngày trước', content: 'Sầu riêng rụng trái non nhiều quá, ai có kinh nghiệm chỉ giúp với.', likes: 8, comments: 22 },
];

const NEW_POSTS_POOL = [
  { author: 'Phạm Văn D', content: 'Thời tiết dạo này thất thường quá, rau màu nhà tôi bị héo rũ hết.', likes: 3, comments: 1 },
  { author: 'Hoàng Thị E', content: 'Có ai biết chỗ mua giống sầu riêng Musang King uy tín ở Tây Nguyên không?', likes: 15, comments: 8 },
  { author: 'Vũ Văn F', content: 'Chia sẻ cách làm phân hữu cơ từ rác thải nhà bếp cực kỳ hiệu quả cho cây cảnh.', likes: 56, comments: 12 },
  { author: 'Đặng Thị G', content: 'Giá tiêu hôm nay lên được 95k rồi bà con ơi, mừng quá!', likes: 120, comments: 45 },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  useEffect(() => {
    let postIndex = 0;
    const interval = setInterval(() => {
      if (postIndex < NEW_POSTS_POOL.length) {
        const newPost = {
          id: Date.now(),
          ...NEW_POSTS_POOL[postIndex],
          time: 'Vừa xong'
        };
        setPosts(prev => [newPost, ...prev]);
        postIndex++;
      }
    }, 15000); // Add a new post every 15 seconds

    return () => clearInterval(interval);
  }, []);
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
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={post.id} 
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
        </AnimatePresence>
      </div>
    </div>
  );
}
