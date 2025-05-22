import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Header from "./Header";
import axios from "../../axiosInstance";

const Contracts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contracts, setContracts] = useState([]);
  const [open, setOpen] = useState(false);
  
  const [eventData, setEventData] = useState({
    contractId: "",
    clientName: "",
    hallName: "",
    hallLocation: "",
    eventType: "",
    date: "",
    amountEarned: "",
    status: "Pending",
  });

  const fetchEvents = async (req, res) => {
    try {
      const res = await axios.get("/events/event", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      const today = new Date();
      const updatedEvents = await Promise.all(
        res.data.map(async (event)=> {
          const eventDate = new Date(event.date);
          if (event.status === "Pending" && eventDate < today){
            await axios.put(`/events/event/${event._id}`,{
              ...event,
              status: "Completed",
            });
            return {...event, status: "Completed"};
          }
          return event;
        })
      )
      setContracts(updatedEvents);
    } catch (err) {
      console.error("Error in fetching the contracts.: " + err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post("/events/event", eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      setOpen(false);
      setEventData({
        // reset the form
        contractId: "",
        clientName: "",
        hallName: "",
        hallLocation: "",
        eventType: "",
        date: "",
        amountEarned: "",
        status: "Pending",
      });
      fetchEvents();
    } catch (err) {
      console.error("Error in Saving Data: " + err);
    }
  };

  const columns = [
    { field: "contractId", headerName: "ID", flex: 0.5 },
    {
      field: "clientName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "hallName",
      headerName: "Hall Name",
      flex: 1,
    },
    {
      field: "hallLocation",
      headerName: "Hall Location",
      flex: 1,
    },
    {
      field: "eventType",
      headerName: "Event Type",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        const date = params;
        if (date) {
          const parsedDate = new Date(date);
          return parsedDate.toLocaleDateString("en-GB"); // Converts to human-readable format
        }
        return "";
      },
    },
    {
      field: "amountEarned",
      headerName: "Payment (₹)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between'>
        <Header title='Contracts' subtitle='Your history of contracts' />
        <Box alignContent='center'>
          <Button
            onClick={handleClickOpen}
            sx={{ backgroundColor: colors.primary[400], color: "#ffffff" }}>
            Add Event
          </Button>
        </Box>
      </Box>
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.redAccent[400],
          },
          "& .past-event-row": {
            backgroundColor: colors.primary[700],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.primary[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
            scrollbarColor: colors.redAccent[400],
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: "#1976d2",
            borderRadius: 4,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[800],
          },

          "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.primary[400]} !important`,
          },
        }}>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
          <DialogTitle sx={{ pt: 3, pb: 2 }}>Create or Edit Event</DialogTitle>

          <Divider />

          <DialogContent sx={{ py: 4, px: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Contract ID'
                  fullWidth
                  value={eventData.contractId}
                  onChange={handleChange}
                  name='contractId'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Client Name'
                  fullWidth
                  value={eventData.clientName}
                  onChange={handleChange}
                  name='clientName'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Hall Name'
                  fullWidth
                  value={eventData.hallName}
                  onChange={handleChange}
                  name='hallName'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  label='Hall Location'
                  fullWidth
                  value={eventData.hallLocation}
                  onChange={handleChange}
                  name='hallLocation'
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label='Event Type'
                  fullWidth
                  value={eventData.eventType}
                  onChange={handleChange}
                  name='eventType'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Date'
                  fullWidth
                  type='date'
                  value={eventData.date}
                  onChange={handleChange}
                  name='date'
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Fee (₹)'
                  fullWidth
                  type='number'
                  value={eventData.amountEarned}
                  onChange={handleChange}
                  name='amountEarned'
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 5, py: 3 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant='contained'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          getRowId={(row) => row._id}
          rows={contracts}
          columns={columns}
          getRowClassName={(params) => {
            const eventDate = new Date(params.row.date);
            const today = new Date();
            if (eventDate < today) {
              return "past-event-row";
            }
            return "";
          }}
        />
      </Box>
    </Box>
  );
};

export default Contracts;
