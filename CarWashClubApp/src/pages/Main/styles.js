import styled from "styled-components/native";

export const ContainerWelcome = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  background-color: papayawhip;
  height: 100px;
`;

export const ContainerData = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: blue;
  margin-top: 20px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 300px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const StyledText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: palevioletred;
`;

export const InputText = styled.TextInput`
  width: 50%;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
  margin-top: 20px;
  border: 1px solid palevioletred;
  ::placeholder {
    color: palevioletred;
  }
`;
export const MiniTextSpan = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`;
