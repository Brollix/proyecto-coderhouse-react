import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from 'react-router-dom'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	color: 'black',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export function BasicModal(props) {
	const { isOpen, handleClose } = props

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Text in a modal
					</Typography>
					<Typography>{JSON.stringify(props.cart?.[0])}</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor
						ligula.
					</Typography>
					<Link to="/">
						<Button onClick={handleClose}>Aceptar</Button>
						{/*Por alguna razon poniendo un "Link to='/'" 
						desde el operador ternario del checkout, 
						no funcionaba el redireccionamiento, 
						este es el workaround que se me ocurrió.*/}
					</Link>
				</Box>
			</Modal>
		</div>
	)
}
