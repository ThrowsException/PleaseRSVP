import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import w from "../utils/w";
import { PlayerList, PlayerForm } from "../components";
import Layout from "../layout/Layout";

const TeamName = styled.h1`
  font-size: 4em;
`;

const TeamDetails = props => {
  const { match } = props;
  const [team, setTeam] = useState([{ name: "Loading..." }]);

  const [members, setMembers] = useState([]);

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

  useEffect(() => {
    fetchData(`/api/teams/${match.params.id}`, setTeam);
    fetchData(`/api/teams/${match.params.id}/members`, setMembers);
  }, []);

  const createMember = async ({ name, email, phone }) => {
    await postData("/api/members", {
      name,
      email,
      phone,
      team: match.params.id
    });
    setMembers([...members, { name, email }]);
  };

  return (
    <Layout {...props}>
      <TeamName>{team[0].name}</TeamName>
      <h2>Players</h2>
      <PlayerList members={members} />
      <PlayerForm submit={createMember} />
    </Layout>
  );
};

TeamDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

export default TeamDetails;
