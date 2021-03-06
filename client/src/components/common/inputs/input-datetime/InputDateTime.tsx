import React from 'react';
import styled from 'styled-components';

const InputDateTimeWrapper = styled.input.attrs({
  type: 'datetime-local',
})`
  width: 100%;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-family: 'Spoqa Han Sans';
`;

interface InputDateTimeProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDateTime: React.FC<InputDateTimeProps> = ({ value, onChange }: InputDateTimeProps) => {
  let currentDate;
  if (value) {
    const date = new Date(new Date(value as string).getTime() + 1000 * 60 * 60 * 9);
    currentDate = date.toISOString().substring(0, date.toISOString().length - 1);
  } else {
    currentDate = value;
  }
  return <InputDateTimeWrapper value={currentDate} onChange={onChange} />;
};

export default InputDateTime;
