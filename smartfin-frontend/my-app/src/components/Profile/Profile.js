import React from 'react';
import './Profile.css';
import { Container, Grid, Paper, TextField, Typography, Button, Avatar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const theme = createTheme();

function Profile() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} className="profile-container">
        <Paper elevation={3} className="profile-paper">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom align='center'>
                 Profile
              </Typography> 
            </Grid>

            {/* Basic Info Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Info
              </Typography>
              <Paper className="profile-section">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Avatar alt="Amelia Harper" src="https://example.com/amelia.jpg" className="profile-avatar" />
                    <Typography variant="h6">Amelia Harper</Typography>
                    <Typography>ID: 22</Typography>
                    <Button variant="outlined">Change Password</Button>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField label="First Name" fullWidth variant="outlined" value="Amelia" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" fullWidth variant="outlined" value="Harper" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Department" fullWidth variant="outlined" value="UI/UX" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Position" fullWidth variant="outlined" value="Designer" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Hired Date" fullWidth variant="outlined" value="3/3/2023" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Birth Date" fullWidth variant="outlined" value="5/3/1980" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Contacts Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Contacts
              </Typography>
              <Paper className="profile-section">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Phone" fullWidth variant="outlined" value="+1(213)555-4276" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" fullWidth variant="outlined" value="ameliah@dx-email.com" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Domain Username" fullWidth variant="outlined" value="corp\\amelia.harper" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Status" fullWidth variant="outlined" value="Salaried" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Supervisor" fullWidth variant="outlined" value="Sam Adamson" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Address Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Paper className="profile-section">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Address" fullWidth variant="outlined" value="405 E 42nd St, New York, New York, USA" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Country" fullWidth variant="outlined" value="USA" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="City" fullWidth variant="outlined" value="New York" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="State/province/area" fullWidth variant="outlined" value="New York" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Zip Code" fullWidth variant="outlined" value="10017" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom align='center'>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ marginRight: '10px' }}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<CancelIcon />}>
                Cancel
              </Button>
              </Typography> 
            </Grid>
            </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
