import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  display : flex;
  justify-content: center; 
  padding : 84px 380px 200px 380px;
  gap: 120px;
`;

export const Leftbar = styled.div`
  width: 248px;
  display : flex;
  flex-direction : column;
  gap: 16px;
`;

export const BarContentWapper = styled.div`
  display : flex;
  flex-direction : column;
  gap: 12px;
`;

export const BarTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const EndBar = styled.p`
  width: 248px;
  border-bottom: solid 1px;
`;

export const BarContent = styled(NavLink)`
  font-size: 16px;
  text-decoration: none;
  color: #333;

  &.active {
    font-weight: bold;
    color: red;
  }
`;

export const ProfileBox = styled.div`
  display : flex;
  padding-bottom: 40px;
`;
export const ProfileText = styled.div`
  font-size: 21px;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const ImageBox = styled.div`
  display : flex;
  align-items: center;
  gap: 20px;
  font-size: 21px;
  font-weight: bold;
`;
export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;  
  object-position: center; 
  border: solid 0.5px #6E7476;

`;

export const DeleteIdFont = styled.p`
  color: gray;
`;
export const CameraImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  top: 30px;
  left: -44px;
`;