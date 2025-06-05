import styled from 'styled-components'
import { EN_H2, H10, H3, H8 } from '../../styles/common';
import { Link } from 'react-router-dom';
const primary = "#EE3333";
const gray100 = "#FBFCFC";
const gray500 = "#C0C5C7";
const gray900 = "#6E7476";
const black = "#333333";
const warning = "#E49804";

const S = {};

S.Link = styled(Link)`
  color: inherit;
  text-decoration: none;
`

S.EN_H2 = styled.p`
  ${EN_H2}
`

S.H8 = styled.p`
  ${H8}
  color: ${black};
`
S.UnSelectedType = styled.p`
  ${H8}
  color: ${gray900};
  cursor: pointer;
  
  &:hover {
    color: ${black};
  }
`

S.SelectedRed = styled.p`
  ${H8}
  color: ${primary};
  cursor: pointer;
  border-bottom: solid 2px ${primary};
`

S.Wrapper = styled.div`
  display : flex; 
  flex-direction : column;
  align-items: center; 
  justify-content: center;
  margin-top: 140px;
`

S.TypeWrapper = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: center;
`

S.TypeDiv = styled.div`
  width: 120px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
S.Bar = styled.p`
  ${H8}
`

S.CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 200px;
`


S.CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
`

S.InputWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 84px 0 0 0;
`

S.SearchIcon = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 12px;
  top: 12px;
`

S.Input = styled.input`
  width: 200px;
  height: 32px;
  border: solid 1px #6E7476;
  border-radius: 1px;
  margin-left: auto;
  background-color: #FBFCFC;
  outline: none;
  padding: 0 0 0 9px;
  ${H10}

  &::placeholder {
    ${H10}
    color: #6E7476;
  }
`

S.Upload = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

S.Icon = styled.img`
  width: 18px;
  height: 18px;
`

S.Menu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
  width: 1160px;
  position: relative;
`

S.DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`
S.DropdownButton = styled.div`
  width: px;
  height: 35px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${H8}
`

S.DropdownIcon = styled.img`
  width: 16px;
  height: 16px;
`

S.Dropdown = styled.div`
  position: absolute;
  top: 36px; 
  left: auto;
  right: 0;
  border: 1px solid #6E7476;
  background-color: #FBFCFC;
  border-radius: 2px;
  z-index: 100; 
  display: flex;
  flex-direction: column;


  :hover {
    
    color: ${primary};
  }
`

S.Option = styled.div`
  width: 75px;
  height: 35px;
  ${H8}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

S.PagenationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`

S.PagenationButton = styled.div`
  width: 9px;
  height: 20px;
  color: ${(props) => (props.$active ? primary : gray900)};
  cursor: pointer;
  display: flex;
  align-items: center; 
  justify-content: center;

  &:hover {
    color: #333333;
  }
`

S.PagenationIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

S.NotFoundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

S.NotFoundH3 = styled.p`
  ${H3}
  color: ${gray500};
`




export default S;