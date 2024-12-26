import React, { useState } from 'react';

const mockData = {
  posts: [
    {
      id: 1,
      platform: "linkedin",
      content: "Excited to share our latest investment insights and market analysis for 2024...",
      date: "2024-01-24",
      author: "Sarah Johnson",
      status: "flagged",
      reason: "Needs performance disclaimer",
      url: "https://linkedin.com/post/1"
    },
    {
      id: 2,
      platform: "facebook",
      content: "Join our upcoming webinar on retirement planning strategies",
      date: "2024-01-23",
      author: "Michael Chen",
      status: "approved",
      url: "https://facebook.com/post/2"
    },
    {
      id: 3,
      platform: "twitter",
      content: "Market update: Our latest analysis shows promising opportunities in tech sector",
      date: "2024-01-22",
      author: "Sarah Johnson",
      status: "pending",
      url: "https://twitter.com/post/3"
    }
  ],
  reviewQueue: [
    {
      id: 1,
      type: "Blog Post",
      title: "2024 Market Outlook",
      submittedBy: "Michael Chen",
      submitDate: "2024-01-23",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      type: "Newsletter",
      title: "Monthly Investment Update",
      submittedBy: "Sarah Johnson",
      submitDate: "2024-01-22",
      priority: "medium",
      status: "in_review"
    }
  ],
  complianceChecklist: [
    { id: 1, item: "Performance disclaimers", required: true },
    { id: 2, item: "Risk disclosures", required: true },
    { id: 3, item: "Regulatory statements", required: true },
    { id: 4, item: "Source citations", required: true },
    { id: 5, item: "Fee transparency", required: true }
  ]
};

const SocialPost = ({ post }) => {
  const getPlatformIcon = (platform) => {
    const iconClasses = "w-5 h-5";
    switch(platform) {
      case 'linkedin':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            post.platform === 'linkedin' ? 'bg-blue-100 text-blue-600' :
            post.platform === 'facebook' ? 'bg-blue-100 text-blue-500' :
            'bg-blue-100 text-blue-400'
          }`}>
            {getPlatformIcon(post.platform)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author}</span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{post.content}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm rounded-full ${
          post.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
          post.status === 'flagged' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
        </span>
      </div>
      {post.reason && (
        <div className="mt-3 p-2 bg-red-50 text-red-800 text-sm rounded">
          <svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          {post.reason}
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({ item }) => (
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.priority === 'high' ? 'bg-red-100 text-red-800' :
            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {item.priority.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">{item.type}</span>
        </div>
        <h3 className="font-medium mt-1">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Submitted by {item.submittedBy} on {item.submitDate}
        </p>
      </div>
      <button className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors">
        Review
      </button>
    </div>
  </div>
);

const MarketingSection = () => {
  const [activeTab, setActiveTab] = useState('monitor');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Marketing Compliance</h1>
          <h2 className="text-2xl text-gray-500">Content Review & Monitoring</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('monitor')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'monitor'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Social Monitor
          </button>
          <button 
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'review'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Review Queue
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Submit Content
          </button>
        </div>
      </div>

      {activeTab === 'monitor' ? (
        <div className="space-y-4">
          {mockData.posts.map(post => (
            <SocialPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Review Queue</h3>
            <div className="space-y-4">
              {mockData.reviewQueue.map(item => (
                <ReviewItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Compliance Checklist</h3>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="space-y-3">
                {mockData.complianceChecklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="text-sm">
                      {item.item}
                      {item.required && (
                        <span className="ml-2 text-xs text-red-600">*Required</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingSection;