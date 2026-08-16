import { useState, useRef } from 'react';

export default function VerifyBeforeTrust() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    setSelectedMedia(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview({ type: 'image', data: e.target.result });
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      setPreview({ type: 'video', name: file.name });
    } else {
      setPreview({ type: 'file', name: file.name });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!selectedMedia) {
      setAnalysis({ error: '⚠ Please upload media first' });
      return;
    }

    const mockAnalysis = {
      verdict: '⚠ SUSPICIOUS',
      scamLikelihood: 72,
      verdict_text: 'This media contains warning signs that suggest potential scam activity.',
      recommendation: 'Proceed with caution. Verify with official sources before trusting.',
      color: '#ff9800',
      signals: [
        { type: 'HIGH', text: 'Urgent language detected' },
        { type: 'MEDIUM', text: 'Spelling inconsistencies' },
        { type: 'MEDIUM', text: 'Vague promises' },
      ],
    };

    setAnalysis(mockAnalysis);
    setAnalyzed(true);
  };

  const handleClear = () => {
    setSelectedMedia(null);
    setPreview(null);
    setAnalysis(null);
    setAnalyzed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {/* Header Section */}
      <div className="pixel-section pixel-section-grass">
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <div className="pixel-h2 pixel-text-glow" style={{ color: 'var(--pixel-black)', marginBottom: '8px' }}>
            🔍 VERIFY BEFORE YOU TRUST 🔍
          </div>
          <div className="pixel-text" style={{ color: 'var(--pixel-black)', textAlign: 'center', lineHeight: '1.6' }}>
            Upload a screenshot, image, or video and let SafeRoots analyze it for trust signals and scam patterns.
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="pixel-section pixel-section-stone">
        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: '3px dashed var(--pixel-yellow)',
              borderRadius: '0px',
              padding: '32px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(255, 193, 7, 0.05)',
              transition: 'all 0.2s',
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📷</div>
            <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '8px' }}>
              DRAG & DROP YOUR MEDIA HERE
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)', marginBottom: '12px' }}>
              or click the button below
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="pixel-btn"
              style={{
                background: 'var(--pixel-green)',
                color: 'var(--pixel-black)',
                padding: '8px 16px',
                border: '3px solid var(--pixel-black)',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              }}
            >
              📁 CHOOSE FILE
            </button>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)', marginTop: '12px', fontSize: '10px' }}>
              Images / Videos / Screenshots
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {/* Preview */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', border: '3px solid var(--pixel-yellow)' }}>
              <div className="pixel-text" style={{ color: 'var(--pixel-white)', marginBottom: '8px', fontSize: '10px' }}>
                📎 MEDIA SELECTED
              </div>
              {preview.type === 'image' && (
                <img
                  src={preview.data}
                  alt="preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    border: '2px solid var(--pixel-white)',
                    display: 'block',
                  }}
                />
              )}
              {preview.type === 'video' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '120px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '2px solid var(--pixel-white)',
                    color: 'var(--pixel-white)',
                    fontSize: '32px',
                  }}
                >
                  🎥
                </div>
              )}
              <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', marginTop: '8px', fontSize: '9px', wordBreak: 'break-all' }}>
                {selectedMedia?.name}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={handleClear}
                className="pixel-btn"
                style={{
                  background: 'var(--pixel-red)',
                  color: 'var(--pixel-white)',
                  padding: '8px',
                  border: '3px solid var(--pixel-black)',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                }}
              >
                🔄 CLEAR
              </button>
              <button
                type="button"
                onClick={handleAnalyze}
                className="pixel-btn"
                style={{
                  background: 'var(--pixel-orange)',
                  color: 'var(--pixel-black)',
                  padding: '8px',
                  border: '3px solid var(--pixel-black)',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  fontWeight: 'bold',
                }}
              >
                ⚡ ANALYZE NOW
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analyzed && analysis && !analysis.error && (
        <div className="pixel-section" style={{ background: analysis.color + '20', borderLeft: `4px solid ${analysis.color}` }}>
          <div style={{ marginBottom: '12px' }}>
            <div className="pixel-h2" style={{ color: analysis.color, marginBottom: '8px' }}>
              {analysis.verdict}
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)', marginBottom: '8px' }}>
              {analysis.verdict_text}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontWeight: 'bold', marginBottom: '4px' }}>
              SCAM LIKELIHOOD: {analysis.scamLikelihood}%
            </div>
            <div
              style={{
                width: '100%',
                height: '20px',
                background: 'rgba(0,0,0,0.3)',
                border: '2px solid var(--pixel-black)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${analysis.scamLikelihood}%`,
                  background: analysis.color,
                }}
              />
            </div>
          </div>

          <div>
            <div className="pixel-text" style={{ color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '4px' }}>
              ✓ RECOMMENDATION
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)' }}>
              {analysis.recommendation}
            </div>
          </div>

          {analysis.signals && (
            <div style={{ marginTop: '12px' }}>
              <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontWeight: 'bold', marginBottom: '4px' }}>
                🚩 WARNING SIGNALS
              </div>
              <div style={{ display: 'grid', gap: '4px' }}>
                {analysis.signals.map((signal, i) => (
                  <div key={i} className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '9px' }}>
                    [{signal.type}] {signal.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
