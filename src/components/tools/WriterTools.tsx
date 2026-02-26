import { useState } from 'react';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';

interface WriterToolProps {
  toolId: string;
}

const contentTypeOptions = [
  { value: 'kids-story', label: 'Kids Story' },
  { value: 'blog-post', label: 'Blog Post' },
  { value: 'instagram-caption', label: 'Instagram Caption' },
  { value: 'product-description', label: 'Product Description' },
  { value: 'email', label: 'Email' },
  { value: 'social-media', label: 'Social Media Post' },
  { value: 'school-letter', label: 'School Letter' },
];

const ageGroupOptions = [
  { value: '3-5', label: '3-5 years' },
  { value: '6-8', label: '6-8 years' },
  { value: '9-12', label: '9-12 years' },
];

const blogToneOptions = [
  { value: 'informative', label: 'Informative' },
  { value: 'casual', label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'entertaining', label: 'Entertaining' },
];

const captionStyleOptions = [
  { value: 'engaging', label: 'Engaging' },
  { value: 'funny', label: 'Funny' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'promotional', label: 'Promotional' },
];

const blogWordCountOptions = [
  { value: '500', label: '500 words' },
  { value: '800', label: '800 words' },
  { value: '1000', label: '1000 words' },
  { value: '1500', label: '1500 words' },
  { value: 'custom', label: 'Custom' },
];

const storyWordCountOptions = [
  { value: '300', label: '300 words' },
  { value: '500', label: '500 words' },
  { value: '700', label: '700 words' },
  { value: '1000', label: '1000 words' },
  { value: 'custom', label: 'Custom' },
];

// ==================== CONTENT WRITER ====================
export function ContentWriter() {
  const [contentType, setContentType] = useState('blog-post');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!details.trim()) return;
    setLoading(true);
    setError('');
    
    const typeLabel = contentTypeOptions.find(o => o.value === contentType)?.label || contentType;
    
    const prompt = `Write high-quality ${typeLabel} content based on these details:

${details}

Create engaging, well-structured ${typeLabel} content. Start with a compelling title on its own line. Make the content professional, engaging, and well-organized. Use appropriate tone and style for ${typeLabel}. For Instagram captions, include relevant hashtags at the end. Follow any language instructions in the details.`;

    const { error: apiError, output } = await generateText(prompt);
    if (apiError) setError(apiError);
    else setResult(output);
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Select 
          label="Content Type" 
          options={contentTypeOptions} 
          value={contentType} 
          onChange={(e) => setContentType(e.target.value)} 
        />
        <TextArea
          label="Details and Instructions"
          placeholder="Describe what you want to write about. Include topic, tone, target audience, and any specific requirements. You can specify language like 'write in Hindi'."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={8}
        />
        <Button onClick={handleGenerate} loading={loading} disabled={!details.trim()}>
          Generate Content
        </Button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <ResultBox content={result} isLoading={loading} />
    </div>
  );
}

// ==================== KIDS STORY WRITER ====================
export function KidsStoryWriter() {
  const [topic, setTopic] = useState('');
  const [ageGroup, setAgeGroup] = useState('6-8');
  const [wordCount, setWordCount] = useState('500');
  const [customWordCount, setCustomWordCount] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    const finalWordCount = wordCount === 'custom' ? customWordCount : wordCount;
    if (!finalWordCount || parseInt(finalWordCount) < 100) {
      setError('Please enter a valid word count (minimum 100 words)');
      return;
    }
    setLoading(true);
    setError('');
    
    const prompt = `Write a wonderful children story of approximately ${finalWordCount} words for ages ${ageGroup} about: "${topic}"

Start with a fun, catchy title on its own line.

Then write an engaging story that:
- Uses age-appropriate vocabulary and sentence length for ${ageGroup} year olds
- Has colorful, imaginative descriptions that children will love
- Features lovable, relatable characters
- Includes gentle humor and wonder
- Builds excitement with a clear beginning, middle, and end
- Ends with a positive message, moral, or lesson

Make it magical and memorable. The kind of story a child would want to hear again and again.`;

    const { error: apiError, output } = await generateText(prompt);
    if (apiError) setError(apiError);
    else setResult(output);
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <TextArea
          label="Story Topic"
          placeholder="What should the story be about? E.g., A brave little rabbit, A magical adventure, Friendship between a cat and dog, A trip to the moon..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
        />
        <Select label="Age Group" options={ageGroupOptions} value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Word Count</label>
          <div className="flex flex-wrap gap-2">
            {storyWordCountOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setWordCount(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  wordCount === opt.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {wordCount === 'custom' && (
            <div className="mt-3">
              <input
                type="number"
                min="100"
                max="5000"
                placeholder="Enter word count (e.g., 400, 600, 800)"
                value={customWordCount}
                onChange={(e) => setCustomWordCount(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
        <Button onClick={handleGenerate} loading={loading} disabled={!topic.trim() || (wordCount === 'custom' && !customWordCount)}>
          Generate Story
        </Button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <ResultBox content={result} isLoading={loading} />
    </div>
  );
}

// ==================== BLOG POST WRITER ====================
export function BlogPostWriter() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('informative');
  const [wordCount, setWordCount] = useState('800');
  const [customWordCount, setCustomWordCount] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    const finalWordCount = wordCount === 'custom' ? customWordCount : wordCount;
    if (!finalWordCount || parseInt(finalWordCount) < 200) {
      setError('Please enter a valid word count (minimum 200 words)');
      return;
    }
    setLoading(true);
    setError('');
    
    const prompt = `Write a comprehensive, SEO-friendly blog post of approximately ${finalWordCount} words about: "${topic}"

Tone: ${tone}

Start with a compelling headline/title on its own line.

Then structure the post with:
- An engaging introduction with a hook that draws readers in
- Clear section headings for the body (each heading on its own line)
- Practical tips, insights, examples, or information under each section
- Smooth transitions between sections
- A strong conclusion with a call-to-action

Use ${tone} tone throughout. Make it informative, engaging, and valuable to readers. Include relevant keywords naturally for SEO.`;

    const { error: apiError, output } = await generateText(prompt);
    if (apiError) setError(apiError);
    else setResult(output);
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <TextArea
          label="Blog Topic"
          placeholder="Enter your blog topic. E.g., 10 Tips for Better Sleep, How to Start a Small Business, Benefits of Morning Exercise..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
        />
        <Select label="Tone" options={blogToneOptions} value={tone} onChange={(e) => setTone(e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Word Count</label>
          <div className="flex flex-wrap gap-2">
            {blogWordCountOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setWordCount(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  wordCount === opt.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {wordCount === 'custom' && (
            <div className="mt-3">
              <input
                type="number"
                min="200"
                max="10000"
                placeholder="Enter word count (e.g., 1200, 2000, 3000)"
                value={customWordCount}
                onChange={(e) => setCustomWordCount(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
        <Button onClick={handleGenerate} loading={loading} disabled={!topic.trim() || (wordCount === 'custom' && !customWordCount)}>
          Generate Blog Post
        </Button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <ResultBox content={result} isLoading={loading} />
    </div>
  );
}

// ==================== INSTAGRAM CAPTION ====================
export function InstagramCaption() {
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('engaging');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    
    const prompt = `Write an ${style} Instagram caption for: "${description}"

Start with an attention-grabbing first line that makes people stop scrolling. Then write engaging body text that connects with the audience emotionally. Include a question or call-to-action to boost engagement. End with 8-12 relevant and trending hashtags.

Make it ${style}, authentic, and shareable. Keep the caption concise but impactful.`;

    const { error: apiError, output } = await generateText(prompt);
    if (apiError) setError(apiError);
    else setResult(output);
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <TextArea
          label="Post Description"
          placeholder="Describe your post. E.g., Photo of sunset at the beach, New product launch, Fitness transformation, Travel photo from Paris..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <Select label="Style" options={captionStyleOptions} value={style} onChange={(e) => setStyle(e.target.value)} />
        <Button onClick={handleGenerate} loading={loading} disabled={!description.trim()}>
          Generate Caption
        </Button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <ResultBox content={result} isLoading={loading} />
    </div>
  );
}

// ==================== SCHOOL LETTER WRITER ====================
export function SchoolLetterWriter() {
  const [letterType, setLetterType] = useState('request');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [studentName, setStudentName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editedResult, setEditedResult] = useState('');

  const letterTypeOptions = [
    { value: 'request', label: 'Leave Request Letter' },
    { value: 'complaint', label: 'Complaint Letter' },
    { value: 'recommendation', label: 'Recommendation Request' },
    { value: 'application', label: 'School Application' },
    { value: 'appeal', label: 'Appeal Letter' },
    { value: 'permission', label: 'Permission Letter' },
    { value: 'excuse', label: 'Excuse/Apology Letter' },
  ];

  const handleGenerate = async () => {
    if (!subject.trim() || !details.trim()) return;
    setLoading(true);
    setError('');
    setEditedResult('');
    
    const letterTypeLabel = letterTypeOptions.find(o => o.value === letterType)?.label || letterType;

    const prompt = `Write a professional, school-appropriate ${letterTypeLabel} letter. Keep the language simple, clear, and suitable for a student or parent writing to school authorities. Use proper letter format.

Letter Type: ${letterTypeLabel}
Subject: ${subject}
Details: ${details}
${studentName ? `Student Name: ${studentName}` : ''}
${schoolName ? `School Name: ${schoolName}` : ''}

Guidelines:
- Use formal but simple, student-friendly language
- Keep it concise and to the point (not too long)
- Use proper letter format with date, address, and salutation
- Be respectful and courteous
- Include a clear purpose statement
- End with a polite closing
- Make it suitable for a school/college context`;

    const { error: apiError, output } = await generateText(prompt);
    if (apiError) setError(apiError);
    else setResult(output);
    setLoading(false);
  };

  const handleSaveEdit = () => {
    if (editedResult.trim()) {
      setResult(editedResult);
      setEditedResult('');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Select 
          label="Letter Type" 
          options={letterTypeOptions} 
          value={letterType} 
          onChange={(e) => setLetterType(e.target.value)} 
        />
        <TextArea
          label="Letter Subject"
          placeholder="E.g., Request for one week leave, Complaint about classroom facilities, Request for recommendation letter..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          rows={2}
        />
        <TextArea
          label="Details and Reason"
          placeholder="Provide details about why you're writing this letter. Include specific dates, situations, or reasons."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
        />
        <input
          type="text"
          placeholder="Student Name (optional)"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="School/College Name (optional)"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleGenerate} loading={loading} disabled={!subject.trim() || !details.trim()}>
          Generate Letter
        </Button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Generated Letter (Editable)</label>
          <textarea
            value={editedResult || result}
            onChange={(e) => setEditedResult(e.target.value)}
            placeholder="Your generated letter will appear here..."
            className="w-full h-96 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
        </div>
        {editedResult && (
          <Button 
            onClick={handleSaveEdit} 
            className="bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </Button>
        )}
        {result && !editedResult && (
          <Button 
            onClick={() => {
              const element = document.createElement('a');
              element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(result);
              element.download = 'letter.txt';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }} 
            className="bg-slate-600 hover:bg-slate-700"
          >
            Download Letter
          </Button>
        )}
      </div>
    </div>
  );
}

// ==================== TOOL WRAPPER ====================
export function WriterToolWrapper({ toolId }: WriterToolProps) {
  switch (toolId) {
    case 'content-writer':
      return <ContentWriter />;
    case 'kids-story':
      return <KidsStoryWriter />;
    case 'blog-post':
      return <BlogPostWriter />;
    case 'instagram-caption':
      return <InstagramCaption />;
    case 'school-letter':
      return <SchoolLetterWriter />;
    default:
      return <div className="text-slate-400">Tool not found</div>;
  }
}
