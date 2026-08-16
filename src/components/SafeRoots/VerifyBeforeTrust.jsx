import { useState, useRef } from 'react';

export default function VerifyBeforeTrust() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [smsText, setSmsText] = useState('');
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

  const getTrafficChallanResult = () => {
    return {
      verdict: '⚠️ SUSPICIOUS TRAFFIC CHALLAN',
      verdict_text: 'This message requires verification before you make any payment. Do not click the payment link in the SMS.',
      color: '#ff9800',
      redFlagsCount: 3,
      goodSignsCount: 1,
      riskLevel: 'VERIFY BEFORE PAYMENT',
      flags: [
        { title: '🔴 Suspicious payment link', description: 'The SMS asks you to pay through a link. Do not use payment links received through suspicious messages.', risk: 'HIGH' },
        { title: '🔴 Urgency / pressure', description: 'The message asks you to pay within a short deadline, which can pressure you into acting before verifying.', risk: 'HIGH' },
        { title: '🟡 Official-looking details', description: 'A challan number and vehicle number can make a message look genuine, but these details alone do not prove that the SMS is authentic.', risk: 'MEDIUM' },
      ],
      goodSigns: [
        'Specific vehicle/challan details provided',
      ],
      verificationSteps: [
        {
          number: '1',
          title: 'Open the official eChallan service',
          content: 'Do not click the link inside the SMS. Open the official Government eChallan service yourself.',
          helper: 'Always navigate to the official service independently instead of using a payment link from an SMS.',
          button: true,
          buttonText: '🌐 OPEN OFFICIAL eCHALLAN',
        },
        {
          number: '2',
          title: 'Check the challan details',
          content: 'On the official eChallan service, choose the appropriate search option and enter:\n\n• Challan Number\n• OR Vehicle Number\n• OR Driving Licence Number\n\nThen complete the required verification/CAPTCHA and view the challan details.',
          button: false,
        },
        {
          number: '3',
          title: 'Compare the information',
          content: 'Compare the official record with the SMS:\n\n✓ Challan number\n✓ Vehicle number\n✓ Date\n✓ Offence\n✓ Challan amount\n✓ Current status\n\nIf the details do not match, do not pay through the SMS.',
          button: false,
        },
      ],
      otherWaysToVerify: [
        {
          title: 'mParivahan',
          description: 'You can also check your vehicle/challan information through the official mParivahan service.',
          button: true,
          buttonText: '📱 CHECK ON mPARIVAHAN',
        },
        {
          title: 'RTO / DTO',
          description: 'Still unsure? Contact or visit your relevant Regional Transport Office (RTO) or District Transport Office (DTO). Use independently verified official contact information. Do not use a phone number provided by the suspicious SMS.',
          button: false,
        },
        {
          title: 'Virtual Courts',
          description: 'If the challan has been forwarded to court, check its status through the official Virtual Courts service.',
          button: true,
          buttonText: '⚖️ CHECK VIRTUAL COURTS',
        },
        {
          title: 'Lok Adalat',
          description: 'If you have a pending traffic matter, check whether it is eligible for settlement through Lok Adalat. Do not imply that every challan can automatically be settled through Lok Adalat.',
          button: false,
        },
      ],
      safeRootsTip: 'VERIFY FIRST → PAY SECOND\n\nA scammer can copy government logos, vehicle numbers and challan-looking details.\n\nDon\'t trust the message just because it looks official.\n\nVerify the claim independently through an official channel.',
    };
  };

  const handleAnalyze = () => {
    if (!selectedMedia && !smsText.trim()) {
      setAnalysis({ error: '⚠ Please upload media or paste SMS text first' });
      return;
    }

    const mockAnalysis = getTrafficChallanResult();
    setAnalysis(mockAnalysis);
    setAnalyzed(true);
  };

  const handleClear = () => {
    setSelectedMedia(null);
    setPreview(null);
    setSmsText('');
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
        {!preview && !smsText ? (
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
        ) : null}

        {/* Text Input for SMS */}
        <div style={{ marginTop: preview || smsText ? '12px' : '0' }}>
          <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontWeight: 'bold', marginBottom: '8px' }}>
            OR PASTE SMS / CONTENT HERE:
          </div>
          <textarea
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            placeholder="Paste the suspicious SMS, message, or challan text here..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '3px solid var(--pixel-yellow)',
              background: 'rgba(0,0,0,0.3)',
              color: 'var(--pixel-white)',
              fontFamily: 'monospace',
              fontSize: '12px',
              boxSizing: 'border-box',
              fontWeight: 'bold',
            }}
          />
        </div>

        {/* Media Preview */}
        {preview && (
          <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
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
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
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

      {/* Analysis Results */}
      {analyzed && analysis && !analysis.error && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Main Warning Header */}
          <div className="pixel-section" style={{ background: 'rgba(255, 152, 0, 0.15)', borderLeft: '4px solid #ff9800' }}>
            <div className="pixel-h2" style={{ color: '#ff9800', marginBottom: '8px' }}>
              {analysis.verdict}
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)' }}>
              {analysis.verdict_text}
            </div>
          </div>

          {/* Red Flags Found */}
          <div className="pixel-section pixel-section-stone">
            <div className="pixel-h3" style={{ color: 'var(--pixel-red)', marginBottom: '12px' }}>
              🚩 RED FLAGS FOUND
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {analysis.flags.map((flag, i) => (
                <div key={i} style={{ background: 'rgba(244, 67, 54, 0.1)', padding: '12px', border: '2px solid var(--pixel-red)' }}>
                  <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontWeight: 'bold', marginBottom: '4px' }}>
                    {flag.title}
                  </div>
                  <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '10px', marginBottom: '4px', lineHeight: '1.4' }}>
                    {flag.description}
                  </div>
                  <div className="pixel-text" style={{ color: '#ff9800', fontSize: '9px', fontWeight: 'bold' }}>
                    Risk: {flag.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Analysis Stats */}
          <div className="pixel-section pixel-section-stone">
            <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '12px' }}>
              📊 DETAILED ANALYSIS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(244, 67, 54, 0.15)', padding: '12px', border: '2px solid var(--pixel-red)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🚩</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-red)', fontWeight: 'bold' }}>
                  RED FLAGS
                </div>
                <div className="pixel-h2" style={{ color: 'var(--pixel-red)', margin: '4px 0' }}>
                  {analysis.redFlagsCount}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '8px' }}>
                  Risk indicators detected
                </div>
              </div>
              <div style={{ background: 'rgba(76, 175, 80, 0.15)', padding: '12px', border: '2px solid var(--pixel-green)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>✅</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-green)', fontWeight: 'bold' }}>
                  GOOD SIGNS
                </div>
                <div className="pixel-h2" style={{ color: 'var(--pixel-green)', margin: '4px 0' }}>
                  {analysis.goodSignsCount}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '8px' }}>
                  Specific details provided
                </div>
              </div>
              <div style={{ background: 'rgba(255, 193, 7, 0.15)', padding: '12px', border: '2px solid var(--pixel-yellow)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚠️</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontWeight: 'bold' }}>
                  RISK LEVEL
                </div>
                <div className="pixel-text" style={{ color: '#ff9800', fontSize: '9px', fontWeight: 'bold', marginTop: '4px' }}>
                  🟠 {analysis.riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* HOW TO VERIFY - Most Prominent */}
          <div className="pixel-section" style={{ background: 'rgba(76, 175, 80, 0.15)', border: '3px solid var(--pixel-green)' }}>
            <div className="pixel-h2" style={{ color: 'var(--pixel-green)', marginBottom: '16px', textAlign: 'center' }}>
              ✅ HOW TO VERIFY THIS CHALLAN
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {analysis.verificationSteps.map((step, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', border: '2px solid var(--pixel-green)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div className="pixel-h2" style={{ color: 'var(--pixel-green)', marginRight: '12px', marginBottom: '0' }}>
                      {step.number}
                    </div>
                    <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '0' }}>
                      {step.title}
                    </div>
                  </div>
                  <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '10px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: step.button || step.helper ? '8px' : '0' }}>
                    {step.content}
                  </div>
                  {step.helper && (
                    <div style={{ background: 'rgba(255, 193, 7, 0.2)', padding: '8px', border: '2px solid var(--pixel-yellow)', marginBottom: '8px' }}>
                      <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontSize: '9px' }}>
                        💡 {step.helper}
                      </div>
                    </div>
                  )}
                  {step.button && (
                    <button
                      className="pixel-btn"
                      style={{
                        background: 'var(--pixel-green)',
                        color: 'var(--pixel-black)',
                        padding: '8px 12px',
                        border: '3px solid var(--pixel-black)',
                        cursor: 'pointer',
                        boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                        fontWeight: 'bold',
                        fontSize: '10px',
                        width: '100%',
                      }}
                    >
                      {step.buttonText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Other Ways to Verify */}
          <div className="pixel-section pixel-section-stone">
            <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '12px' }}>
              🏛️ OTHER WAYS TO VERIFY
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {analysis.otherWaysToVerify.map((way, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', border: '2px solid var(--pixel-yellow)' }}>
                  <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontWeight: 'bold', marginBottom: '4px' }}>
                    {way.title}
                  </div>
                  <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '9px', lineHeight: '1.4', marginBottom: way.button ? '8px' : '0' }}>
                    {way.description}
                  </div>
                  {way.button && (
                    <button
                      className="pixel-btn"
                      style={{
                        background: 'var(--pixel-blue)',
                        color: 'var(--pixel-white)',
                        padding: '6px 10px',
                        border: '2px solid var(--pixel-black)',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                        fontWeight: 'bold',
                        fontSize: '9px',
                        width: '100%',
                      }}
                    >
                      {way.buttonText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SafeRoots Tip */}
          <div style={{ background: 'rgba(124, 179, 66, 0.2)', padding: '16px', border: '3px solid var(--pixel-green)' }}>
            <div className="pixel-h3" style={{ color: 'var(--pixel-green)', marginBottom: '8px' }}>
              🛡️ SAFEROOTS TIP
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '10px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {analysis.safeRootsTip}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {analysis && analysis.error && (
        <div style={{ background: 'rgba(244, 67, 54, 0.15)', padding: '16px', border: '3px solid var(--pixel-red)' }}>
          <div className="pixel-text" style={{ color: 'var(--pixel-red)', fontWeight: 'bold' }}>
            {analysis.error}
          </div>
        </div>
      )}
    </div>
  );
}
