import Header from "../components/layout/Header";
import {Button, Stack, Typography} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Home() {

    return <div style={{ padding: "40px", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
            Full Stack Assessment
        </Typography>
        <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            mb={4}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg"
                alt="Spring Boot"
                height="40"
            />
            <img
                src="https://jwt.io/img/logo-asset.svg"
                alt="JWT"
                height="40"
            />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                height="40"
            />
            <img
                src="https://mui.com/static/logo.png"
                alt="Material UI"
                height="40"
            />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                alt="PostgreSQL"
                height="40"
            />
            <img
                src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*tFl-8wQUENETYLjX5mYWuA.png"
                alt="AWS"
                height="40"
            />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg"
                alt="Kubernetes"
                height="40"
            />

        </Stack>
        <Stack direction="row" justifyContent="center">
            <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href="https://github.com/SebastianBelmonte01/fullstackassessment"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    backgroundColor: "#2563eb",
                    "&:hover": {
                        backgroundColor: "#1d4ed8",
                    },
                }}
            >
                View GitHub
            </Button>
        </Stack>
    </div>;
}
