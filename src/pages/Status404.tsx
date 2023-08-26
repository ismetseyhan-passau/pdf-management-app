import {
    Box,
    Card,
    Typography,
    Container,
    Button,
} from '@mui/material';


import {styled} from '@mui/material/styles';
import {Helmet} from "react-helmet-async";


const MainContent = styled(Box)(
    // @ts-ignore
    ({theme}) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);


function Status404() {
    return (
        <>
            <Helmet>
                <title> PDF Viewer - Status 404 </title>
            </Helmet>
            <MainContent>
                <Container maxWidth="md" sx={{mt: 4}}>
                    <Box textAlign="center">
                        <img alt="404" height={180} src="/src/assets/static/404.svg"/>
                        <Typography variant="h2" sx={{my: 2}}>
                            The page you were looking for doesn't exist.
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.secondary"
                            fontWeight="normal"
                            sx={{mb: 4}}
                        >
                            It's on us, we moved the content to a different page. The search
                            below should help!
                        </Typography>
                    </Box>
                    <Container maxWidth="sm">
                        <Card sx={{textAlign: 'center', mt: 3, p: 4}}>
                            <Button href="/" variant="outlined">
                                Go to homepage
                            </Button>
                        </Card>
                    </Container>
                </Container>
            </MainContent>
        </>
    );
}

export default Status404;
