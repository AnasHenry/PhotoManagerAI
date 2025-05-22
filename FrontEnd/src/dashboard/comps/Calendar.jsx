import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import axios from "../../axiosInstance";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
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

  const filteredEvents = currentEvents.filter(
    (event) => event.status !== "Completed"
  );

  const [page, setPage] = useState(0);
  const eventsperPage = 5;

  const paginatedEvents = filteredEvents.slice(
    page * eventsperPage,
    (page + 1) * eventsperPage
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchEvents = async (req, res) => {
    try {
      const res = await axios.get("/events/event", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      const events = res.data.map((event) => ({
        id: event._id,
        title: `${event.clientName} - ${event.eventType}`,
        start: event.date,
        end: event.date,
        allDay: true,
        status: event.status,
      }));
      setCurrentEvents(events);
      console.log(events);
    } catch (err) {
      console.error("Error in fetching the contracts.: " + err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (selected) => {
    // console.log("Selected: " + JSON.stringify(selected));
    setEventData({
      contractId: "",
      clientName: "",
      hallName: "",
      hallLocation: "",
      eventType: "",
      date: selected.startStr,
      amountEarned: "",
      status: "Pending",
    });
    setOpen(true);
  };


  const handleEventClick = async (selected) => {
    console.log(selected.event.id);
    if (
      window.confirm(
        `Are you sure about deleting this event '${selected.event.title}'`
      )
    ) {
      try {
        await axios.delete(`/events/event/${selected.event.id}`);
        selected.event.remove();
      } catch (err) {
        console.error("Error deleting event", err);
      }
    }
  };

  const handleEventDrop = async (info) =>{
    const {id, start} = info.event;
    try{
      await axios.put(`/events/event/${id}`, {date: start}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      fetchEvents();
    }catch(err){
      console.error(err);
      info.revert();
    }
  }

  const handleSave = async () => {
    try {
      await axios.post("/events/event", eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      // console.log("EData: " + JSON.stringify(eventData));
      setOpen(false);
      setEventData({
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
      console.error(err);
    }
  };

  return (
    <Box m='20px'>
      <Header title='CALENDAR' subtitle='Your events schedule' />
      <Box display='flex' justifyContent='space-between'>
        <Box
          flex='1 1 20%'
          backgroundColor={colors.primary[400]}
          p='15px'
          borderRadius='4px'>
          <Typography variant='h5'>Events</Typography>
          <List>
            {paginatedEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.redAccent[400],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}>
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Box display='flex' justifyContent='space-between' mt={2}>
            <IconButton
              variant='outlined'
              disabled={page === 0}
              onClick={() => setPage(page - 1)}>
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <IconButton
              variant='outlined'
              disabled={(page + 1) * eventsperPage >= currentEvents.length}
              onClick={() => setPage(page + 1)}>
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Box flex='1 1 100%' ml='15px'>
          <FullCalendar
            height='75vh'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            events={currentEvents}
          />
        </Box>
      </Box>
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
    </Box>
  );
};
export default Calendar;
