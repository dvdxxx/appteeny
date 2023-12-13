import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function CopyRight(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://appteeny.com/">
            Appteeny
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}

