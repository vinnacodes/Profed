import React, { useState, useRef } from 'react';
import { Image, X } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

interface CreatePostFormProps {
  onPostCreated?: (post: any) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !previewImage) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost = {
        id: `post-${Date.now()}`,
        content,
        imageUrl: previewImage,
        author: currentUser,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      };
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      // Reset form
      setContent('');
      setImageUrl('');
      setPreviewImage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExternalImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewImage(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          {currentUser && (
            <Avatar src={currentUser.profileImage} alt={currentUser.name} />
          )}
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
            />
            
            {previewImage && (
              <div className="relative mt-2 rounded-lg overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full max-h-60 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-75 rounded-full text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <div className="mt-3">
              <input 
                type="text"
                placeholder="Or enter an image URL"
                value={imageUrl}
                onChange={handleExternalImageUrl}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg mb-3"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <Image className="h-5 w-5 mr-1" />
                    Add Photo
                  </button>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={(!content.trim() && !previewImage) || isSubmitting}
                  isLoading={isSubmitting}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;