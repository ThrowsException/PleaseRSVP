import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const TeamForm = ({ submit }) => {
  const [name, setName] = useState("");

  const handleInputChange = e => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <>
      <div>
        <TextField
          label="Team Name"
          name="team"
          onChange={handleInputChange}
          value={name}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          submit(name);
          setName("");
        }}
      >
        Create Team
      </Button>
    </>
  );
};

export default TeamForm;
