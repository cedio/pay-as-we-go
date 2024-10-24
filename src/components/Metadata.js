import React from 'react';
import { Typography, Box } from '@mui/material';

function Metadata() {
  const commitHash = process.env.REACT_APP_COMMIT_HASH || 'N/A';

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="body2" color="textSecondary">
        Latest Commit: {commitHash.substring(0, 7)}
      </Typography>
    </Box>
  );
}

export default Metadata;
