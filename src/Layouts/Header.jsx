import React, {useEffect, useState} from 'react';
import {baseUrl} from "../static/baseUrl";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from '../static/Themes/Theme.jsx'

const pages = ["Products"];
const settings = ['Profile', 'Logout'];

export default function Header(props) {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem("userMe"))

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (key) => {
        switch (key) {
            case "Profile":
                break
            case "Logout":
                logout()
                break
            default:
                break
        }
        setAnchorElUser(null);
    };

    const logout = () => {
        fetch(`${baseUrl}/logout`, {
            method: "POST", credentials: "include", headers: {Cookies: document.cookie}
        })
            .then(res => res.json())
            .then(res => {
                //remove userMe from localstorage
                localStorage.removeItem("userMe")
                //reload page
                window.location.reload()
            })
            .catch(err => err)
    }

    return (
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Link className={"text-[30px] mr-[25px]"} to={"/"}>Orange Bag</Link>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom', horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top', horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page) => (<MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>))}
                                </Menu>
                            </Box>

                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map((page) => (<Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page}
                                    </Button>))}
                            </Box>

                            {props.isUserAuthed ? <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <div
                                            className={"rounded-[100%] bg-amber-600 px-4 py-2 text-white"}>{currentUser.name.substring(0, 1)}</div>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top', horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top', horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (<MenuItem key={setting} onClick={() => {
                                            handleCloseUserMenu(setting)
                                        }}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>))}
                                </Menu>
                            </Box> : <Link to={"/login"}>Log in</Link>}

                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>);
}
