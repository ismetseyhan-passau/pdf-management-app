import {useRef, useState} from 'react';

import {
    Avatar,
    Box,
    Button,
    Hidden,
    lighten,
    Popover,
    Typography
} from '@mui/material';

import {styled} from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

import {useAuth} from '../../../../contexts/AuthContext.tsx';
import {useNavigate} from "react-router-dom";

const UserBoxButton = styled(Button)(
    ({theme}) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
    ({theme}) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({theme}) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
    ({theme}) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
    ({theme}) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);



function HeaderUserbox() {
    const {currentUser,signOut} = useAuth();
    const navigate = useNavigate();
    const user = {
        name: currentUser?.firstName+' '+currentUser?.lastName,
        jobtitle: 'Job Title Part'
    };

    const handleSignOut = () => {
        signOut().then(() => {
            navigate('/login', {replace: true});
        })
    };

    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar variant="rounded" alt={user.name} />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ml: 1}}/>
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuUserBox sx={{minWidth: 210}} display="flex">
                    <Avatar variant="rounded" alt={user.name}/>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Box sx={{m: 1}}>
                    <Button color="primary" fullWidth  onClick={handleSignOut}>
                        <LockOpenTwoToneIcon sx={{mr: 1}}/>
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
