import PageHeader from './PageHeader';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import {Grid, Container} from '@mui/material';

import RecentOrders from './RecentOrders';
import Footer from "../../components/Footer";

function DocumentManagement() {
    return (
        <>
            <title>Document - Management</title>
            <PageTitleWrapper>
                <PageHeader/>
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <RecentOrders/>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </>
    );
}

export default DocumentManagement;
