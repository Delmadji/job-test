import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Showinfo = ({
  openShowinfo,
  setOpenShowinfo,
  clientInformation,
  handleConfirmed,
}) => {
  return (
    <div>
      <Dialog
        open={openShowinfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Client information:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <spam className="title">Name:</spam>{" "}
            {clientInformation.client.full_name} <br />{" "}
            <spam className="title">Phone:</spam>{" "}
            {clientInformation.client.phones[0]} <br />
            <spam className="title">City:</spam>{" "}
            {clientInformation.destination.city_name} <br />
            <spam className="title">Status:</spam>{" "}
            {clientInformation.last_status}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShowinfo(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmed(clientInformation)} autoFocus>
            Confirmed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Showinfo;
