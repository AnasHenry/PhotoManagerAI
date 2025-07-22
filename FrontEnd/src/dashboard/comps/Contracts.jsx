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
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Header from "./Header";
import axios from "../../axiosInstance";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Contracts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gridRef = useRef();
  const [contracts, setContracts] = useState([]);
  const [open, setOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const previewRef = useRef(null);

  const [eventData, setEventData] = useState({
    contract_id: "",
    client_name: "",
    hall_name: "",
    hall_location: "",
    event_type: "",
    date: "",
    amount_earned: "",
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
        res.data.map(async (event) => {
          const eventDate = new Date(event.date);
          if (event.status === "Pending" && eventDate < today) {
            await axios.put(`/events/event/${event._id}`, {
              ...event,
              status: "Completed",
            });
            return { ...event, status: "Completed" };
          }
          return event;
        })
      );
      setContracts(updatedEvents);
    } catch (err) {
      console.error("Error in fetching the contracts.: " + err);
    }
  };

  const handleRecordClick = async (selected) => {
    // console.log(selected.event.id);
    if (
      window.confirm(
        `Are you sure about deleting this event '${selected.event.title}'`
      )
    ) {
      try {
        await axios.delete(`/events/event/${selected.event.id}`);
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event", err);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
    const resizeObserver = new ResizeObserver(() => {
      const event = new Event("resize");
      window.dispatchEvent(event); // Force DataGrid to recalculate
    });

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => resizeObserver.disconnect();
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

  const downloadPdf = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: 2, // Better quality
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedEvent?.eventType}_contract.pdf`);
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
        // reseting the form
        contract_id: "",
        client_name: "",
        hall_name: "",
        hall_location: "",
        event_type: "",
        date: "",
        amount_earned: "",
        status: "Pending",
      });
      fetchEvents();
    } catch (err) {
      console.error("Error in Saving Data: " + err);
    }
  };

  const columns = [
    { field: "contract_id", headerName: "ID", flex: 0.5 },
    {
      field: "client_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "hall_name",
      headerName: "Hall Name",
      flex: 1,
    },
    {
      field: "hall_location",
      headerName: "Hall Location",
      flex: 1,
    },
    {
      field: "event_type",
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
      field: "amount_earned",
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        return (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            gap={1} // Controls spacing between buttons
            sx={{
              width: "100%", // Use full width of the cell
              overflow: "visible",
              margin: "10px 0 0 0" // Allow icons to breathe
            }}>
            <Button
              onClick={() => {
                setSelectedEvent(params.row);
                setQrDialogOpen(true);
              }}
              color='info'
              size="small"
              width="100px"
              startIcon={<VisibilityIcon />}
            />
            <Button
              onClick={() =>
                handleRecordClick({
                  event: {
                    id: params.row.id,
                    title: params.row.event_type,
                    remove: () => fetchEvents(),
                  },
                })
              }
              color='error'
              size="small"
              startIcon={<DeleteIcon />}
            />
          </Box>
        );
      },
    },
  ];
  return (
    <Box m='20px'>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');`}
      </style>

      {/* Apply font only inside this component */}
      <div
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
        }}>
        <Box display='flex' justifyContent='space-between'>
          <Header title='Contracts' subtitle='Your history of contracts' />
          <Box alignContent='center'>
            <Button
              onClick={handleClickOpen}
              sx={{ backgroundColor: colors.primary[900], color: "#ffffff" }}>
              Add Event
            </Button>
          </Box>
        </Box>
        <Box
          ref={gridRef}
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
              color: colors.whiteAccent[400],
            },
            "& .past-event-row": {
              backgroundColor: colors.primary[700],
            },
            "& .MuiDataGrid-columnHeader !important": {
              backgroundColor: colors.primary[800],
              borderBottom: "none",
            },
            "& .MuiDataGrid-row:hover !important": {
              backgroundColor: colors.primary[800],
            },

            "& .MuiDataGrid-virtualScroller ": {
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
              backgroundColor: colors.primary[700],
            },

            "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.primary[400]} !important`,
            },
          }}>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <DialogTitle sx={{ pt: 3, pb: 2 }}>
              Create or Edit Event
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ py: 4, px: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Contract ID'
                    fullWidth
                    value={eventData.contract_id}
                    onChange={handleChange}
                    name='contract_id'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Client Name'
                    fullWidth
                    value={eventData.client_name}
                    onChange={handleChange}
                    name='client_name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Hall Name'
                    fullWidth
                    value={eventData.hall_name}
                    onChange={handleChange}
                    name='hall_name'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <TextField
                    label='Hall Location'
                    fullWidth
                    value={eventData.hall_location}
                    onChange={handleChange}
                    name='hall_location'
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    label='Event Type'
                    fullWidth
                    value={eventData.event_type}
                    onChange={handleChange}
                    name='event_type'
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
                    value={eventData.amount_earned}
                    onChange={handleChange}
                    name='amount_earned'
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 5, py: 3 }}>
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={handleClose} variant='contained'>
                Cancel
              </Button>
              <Button onClick={handleSave} variant='contained'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <DataGrid
            key={"collapsed"}
            getRowId={(row) => row.id}
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
          <Dialog
            open={qrDialogOpen}
            onClose={() => setQrDialogOpen(false)}
            maxWidth='sm'
            fullWidth>
            <DialogTitle>Contract Preview</DialogTitle>
            <DialogContent dividers>
              <div
                ref={previewRef}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontFamily: "Arial, sans-serif",
                  backgroundColor: "#fff",
                  color: "#000",
                }}>
                <h2 style={{ marginBottom: "10px" }}>
                  {selectedEvent?.event_type}
                </h2>
                <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                  Location: {selectedEvent?.hall_location}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                  Date: {new Date(selectedEvent?.date).toLocaleDateString()}
                </p>
                <QRCodeCanvas
                  value={`https://docs.google.com/forms/d/e/1FAIpQLSePpYPwCwfjuM7nrk0DatJMWxup5cnIH4FYf2mZ8NjrRwXpMg/viewform?usp=pp_url&entry.1075613170=${encodeURIComponent(
                    `${selectedEvent?.client_name} ${selectedEvent?.event_type} - ${selectedEvent?.hall_name}`
                  )}`}
                  size={200}
                />
                <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                  Please scan the QR to submit your email, phone number, and a
                  recent photo.
                </p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setQrDialogOpen(false)}>Close</Button>
              <Button onClick={downloadPdf} variant='contained' color='primary'>
                Download as PDF
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </Box>
  );
};

export default Contracts;
