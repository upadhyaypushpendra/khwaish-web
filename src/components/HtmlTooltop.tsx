import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="bottom" arrow disableHoverListener/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#4747e594',
        color: 'rgba(255, 255, 255, 1)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        // border: '1px solid #dadde9',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#4747e594',
        fontSize: theme.typography.pxToRem(12),
    },
}));

export default HtmlTooltip;