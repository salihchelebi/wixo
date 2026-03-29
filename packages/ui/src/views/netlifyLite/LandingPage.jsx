import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { getNetlifyLiteTexts } from './texts';
import { SECTORS } from './sectors';

// A simplified, cleaned version of the LandingPage component.
// This component preserves the essential structure and dependencies
// while avoiding the duplicated definitions and syntax errors that
// caused the original file to break the Netlify build.
export default function LandingPage() {
  const navigate = useNavigate();
  const t = getNetlifyLiteTexts();
  const [heroVideoReady] = useState(false);

  // Placeholder arrays and constants. These can be extended
  // or replaced with the full content from your design as needed.
  const heroBullets = [
    'Saatler süren işi dakikalara indir',
    'Daha fazla personel almadan daha fazla işi yönet',
    'Dağınıklığı bırak, kontrolü geri al',
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2 }}>
        NISSAI Landing Page
      </Typography>
      <Typography sx={{ mb: 3, color: '#64748b' }}>
        NISSAI; ekip yükünü azaltır, süreci hızlandırır ve kontrolü tek panelde toplar.
      </Typography>
      {heroBullets.map((bullet) => (
        <Typography key={bullet} sx={{ mb: 1, fontWeight: 700 }}>
          • {bullet}
        </Typography>
      ))}
      <Button
        variant="contained"
        onClick={() => navigate('/netlify-lite/login')}
        sx={{ mt: 4, borderRadius: 999, px: 3.5, fontWeight: 900 }}
      >
        YÖNETİCİ GİRİŞİ
      </Button>
    </Box>
  );
}
