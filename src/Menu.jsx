import {Link} from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'


const Menu = () => {
  const Li = styled.li `
  text-decoration: none;
  color: black;
  transition: 0.3s;
  list-style: none;
  &:hover{
    text-decoration: none;
    color: black;
    transition: 0.3s;
    list-style: none;
  }`
  return(

    <aside>
    <div>
      <ul className = "list-group" css = {css`
        list-style: none;
        text-decoration: none;
        text-decoration: none;
      `}>
        <Link to = "/catalogos">
          <Li className = "list-group-item"> Personas </Li>
        </Link>
        <Link to = "/catalogos/departamentos">
          <Li className = "list-group-item"> Departamentos </Li>
        </Link>
        <Link to = "/catalogos/computadoras">
          <Li className = "list-group-item"> Computadoras </Li>
        </Link>
      </ul>
    </div>
    </aside>
  )
}

export default Menu
