import styled from 'styled-components';
import { H1, H10, H4, H6, H8, H9 } from '../../../styles/common';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
const primary = "#EE3333";
const gray900 = "#6E7476";
const gray500 = "#C0C5C7";
const black = "#333333";
const white = "#FBFCFC"

const S = {};

S.Map = styled.div`
  width: 1160px;
  height: 425px;
  margin-top: 84px;
  text-align: center;

  position: relative;
  overflow: visible;
  
  #map {
    width: 100%;
    height: 100%;
  }
`;

S.Wrap = styled.div`
  width: 1160px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
`;

S.FilterContainer = styled.div`
  width: 492px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

S.Dropdown = styled.div`
  position: relative;
  background-color: ${white};
`;

S.DropdownButton = styled.button`
  ${H8}
  width: 112px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  background-color: ${white} !important;
  border: none;
  cursor: pointer;
`;

S.DropdownList = styled.ul`
  ${H8}
  position: absolute;
  top: 36px;
  left: 0;
  width: 88px;
  padding-left: 12px;
  background-color: ${white} !important;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 400px;
  overflow-y: auto;

  li {
    padding: 8px 0;
    text-align: left;
    cursor: pointer;

    &:hover {
      color: ${primary};
    }
  }
`;

S.DropdownIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`

S.SearchBox = styled.div`
  margin-left: auto;
  position: relative;

  input {
    ${H10};
    width: 184px;
    height: 32px;
    border: 1px solid ${gray900};
    /* border-radius: 3px; */
    padding: 0 32px 0 8px;
    outline: none;
  }
`;

S.SearchIcon = styled.img`
  position: absolute;
  top: 7px;
  right: 7px;
`

S.ImgWrap = styled.div`
  width: 558px;
  height: 444px;
  margin-left: auto;

  & .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: white !important;
  }

  & .swiper-button-next, .swiper-button-prev {
    color: white !important;
  }
`

S.ContentWrap = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
`;

S.TipWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 6px;
`;

S.question = styled.img`
  cursor: pointer;
   width: 16px;
   height: 16px;
   

   &:hover + div{
      display: block;
   }
`

S.Tip = styled.div`
  ${H10}
  display: none;
  position: absolute;
  top: 0;
  left: 24px;
  background-color: ${white};
  color: ${gray900};
`

S.ListWrap = styled.div`
  width: 492px;
  height: 444px;
  border-top: 1px solid ${gray900};
  /* 스크롤 */
  overflow-y: auto;
`;

S.RedBox = styled.div`
  position: absolute;
  left: 132px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 80px;
  background-color: ${primary};
  border-radius: 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  z-index: 1;
`;

S.UniversityItem = styled.div`
  width: 456px;
  height: 128px;
  margin-top: 16px;
  display: flex;
  position: relative;
  cursor: pointer;

  &:hover .redBox {
    opacity: 1;
  }
`;

S.UniversityLogoBox = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 10px;
  border: 1px solid ${gray500};
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.UniversityLogo = styled.img`
  width: 84px;
  height: 84px;
`;

S.UniversityInfo = styled.div`
  width: 300px;
  height: 128px;
  margin-left: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.UniversityName = styled.p`
  ${H6}
  color: ${black};
`;

S.ExhibitionTitle = styled.p`
  ${H9}
  color: ${black};
  margin-top: 2px;
`;

S.MajorName = styled.p`
  ${H10}
  color: ${gray900};
  margin-top: 2px;
`;

S.ExhibitionDate = styled.p`
  ${H10}
  color: ${gray900};
  margin-top: 8px;
`;

S.ExhibitionLocation = styled.p`
  ${H10}
  color: ${gray900};
  margin-top: 4px;
`;

S.ButtonWrapper = styled.div`
  display: flex;
  margin-top: 4px;
  color: ${gray900};
`;

S.VisitButton = styled.button`
  width: 196px;
  height: 28px;
  background-color: ${white};
  border: 1px solid ${gray900};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: inherit;
    text-decoration: none;
  }

`;

S.LikeButton = styled.button`
  ${H8}
  width: 88px;
  height: 28px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;

  background-color: ${({ $liked }) => ($liked ? primary : white)};
  color: ${({ $liked }) => ($liked ? white : primary)};
  border: 1px solid ${primary};
`;

S.heartText = styled.p`
  ${H8};
`

S.heart = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 4px;
`

S.SwiperSlide = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;



S.ButtonWrap = styled.div`
  display: flex;
  gap: 80px;
  margin: 100px auto 0;
`;

S.ContactButton = styled.button`
  ${H4};
  width: 300px;
  height: 60px;
  border: 1.5px solid ${primary};
  color: ${primary};
  border-radius: 3px;
  background-color: ${white};
  cursor: pointer;
`;

S.RegistrationButton = styled.button`
  ${H4};
  width: 300px;
  height: 60px;
  color: ${white};
  border: 1.5px solid ${primary};
  background-color: ${primary};
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s;
`;

S.Link = styled(Link)`
  text-decoration: none;
`


export default S;