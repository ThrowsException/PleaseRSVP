import React, { useEffect, useState } from "react";
import { TeamForm, TeamList } from "../components";
import Button from "../components/Button";
import Layout from "../layout/Layout";
import w from "../utils/w";

const Teams = props => {
  const [teams, setTeams] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const postData = async (url, body) => {
    await w
      .url(url)
      .post({ ...body })
      .json();
  };

  const fetchData = async (url, callback) => {
    await w
      .url(url)
      .get()
      .json(json => {
        callback(json);
      });
  };

  const onDelete = async id => {
    setTeams(teams.filter(item => item.id !== id));
    await w(`/api/teams/${id}`).delete();
  };

  useEffect(() => {
    fetchData("/api/teams", setTeams);
  }, []);

  const createTeam = async name => {
    if (name) {
      const team = await postData("/api/teams", { name });
      setTeams([...teams, team]);
      setFormVisible(false);
    }
  };

  return (
    <Layout {...props}>
      <TeamList items={teams} onDelete={onDelete} />
      <Button onClick={() => setFormVisible(!!formVisible)}>+ Add Team</Button>
      {formVisible && <TeamForm submit={createTeam} />}
    </Layout>
  );
};

export default Teams;
