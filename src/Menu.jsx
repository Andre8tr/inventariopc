import {Link} from 'react-router-dom'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const Menu = () => {
  return(

    <aside>
    <div>
      <ul className = "list-group" css = {css`
        list-style: none;
        text-decoration: none;
      `}>
        <Link to = "/catalogos">
          <li className = "list-group-item" > Personas </li>
        </Link>
        <Link to = "/catalogos/departamentos">
          <li className = "list-group-item"> Departamentos </li>
        </Link>
        <Link to = "/catalogos/computadoras">
          <li className = "list-group-item"> Computadoras </li>
        </Link>
      </ul>
    </div>
    </aside>
  )
}

export default Menu
