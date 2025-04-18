'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  _id: string;
  author: string;
  authorEmail?: string;
  authorImage?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Reply[];
}

interface Reply {
  _id: string;
  author: string;
  authorEmail?: string;
  authorImage?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/comments?postId=${postId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [postId]);

  // Handle submitting a new comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !session) return;
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: commentText,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      
      const data = await response.json();
      
      // Add the new comment to the list
      setComments([data.comment, ...comments]);
      setCommentText('');
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment. Please try again.');
    }
  };

  // Handle submitting a reply
  const handleReplySubmit = async (commentId: string) => {
    if (!replyText.trim() || !session) return;
    
    try {
      const response = await fetch('/api/comments/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          content: replyText,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to post reply');
      }
      
      const data = await response.json();
      
      // Update the comments list with the updated comment (including the new reply)
      setComments(
        comments.map(comment => 
          comment._id === commentId ? data.comment : comment
        )
      );
      
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Error posting reply:', err);
      setError('Failed to post reply. Please try again.');
    }
  };

  // Handle liking a comment
  const handleLikeComment = async (commentId: string) => {
    if (!session) return;
    
    try {
      const response = await fetch('/api/comments/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to like comment');
      }
      
      const data = await response.json();
      
      // Update the comments list with the updated like count
      setComments(
        comments.map(comment => 
          comment._id === commentId ? data.comment : comment
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err);
      setError('Failed to like comment. Please try again.');
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'some time ago';
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {/* Comment form */}
        <div className="mb-8">
          {status === 'authenticated' ? (
            <form onSubmit={handleCommentSubmit}>
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={40} 
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {getUserInitials(session.user?.name || 'U')}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a comment..."
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      disabled={!commentText.trim()}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
           ) : status === 'loading' ? (
            <div className="flex justify-center py-4">
              <div className="animate-pulse h-10 w-10 bg-gray-200 rounded-full"></div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-2">Please sign in to leave a comment</p>
              <a 
                href="/auth/login" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
        
        {/* Comments list */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse flex">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment._id} className="comment-container">
                <div className="flex">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    {comment.authorImage ? (
                      <Image 
                        src={comment.authorImage} 
                        alt={comment.author} 
                        width={40} 
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {getUserInitials(comment.author)}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <h4 className="font-bold text-gray-900">{comment.author}</h4>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">
                        {comment.content}
                      </p>
                    </div>
                    <div className="mt-2 ml-4 flex items-center text-sm text-gray-500">
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                        className="hover:text-blue-600"
                      >
                        Reply
                      </button>
                      <span className="mx-2">•</span>
                      <button 
                        onClick={() => handleLikeComment(comment._id)}
                        className="hover:text-blue-600 flex items-center"
                      >
                        <span>Like</span>
                        {comment.likes > 0 && (
                          <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                            {comment.likes}
                          </span>
                        )}
                      </button>
                    </div>
                    
                    {/* Reply form */}
                    {replyingTo === comment._id && session && (
                      <div className="mt-4 ml-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                            {session.user?.image ? (
                              <Image 
                                src={session.user.image} 
                                alt={session.user.name || 'User'} 
                                width={32} 
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                {getUserInitials(session.user?.name || 'U')}
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <textarea 
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder={`Reply to ${comment.author}...`}
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            ></textarea>
                            <div className="mt-2 flex justify-end space-x-2">
                              <button 
                                onClick={() => setReplyingTo(null)}
                                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => handleReplySubmit(comment._id)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                disabled={!replyText.trim()}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-8 space-y-4">
                        {comment.replies.map((reply, index) => (
                          <div key={index} className="flex">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                              {reply.authorImage ? (
                                <Image 
                                  src={reply.authorImage} 
                                  alt={reply.author} 
                                  width={32} 
                                  height={32}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                  {getUserInitials(reply.author)}
                                </div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <h4 className="font-bold text-gray-900 text-sm">{reply.author}</h4>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {reply.content}
                                </p>
                              </div>
                              <div className="mt-1 ml-3 flex items-center text-xs text-gray-500">
                                <button 
                                  className="hover:text-blue-600 flex items-center"
                                >
                                  <span>Like</span>
                                  {reply.likes > 0 && (
                                    <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                                      {reply.likes}
                                    </span>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
