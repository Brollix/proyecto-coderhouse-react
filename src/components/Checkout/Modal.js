import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 500,
	color: 'black',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export function BasicModal(props) {
	const { emptyCart } = useContext(CartContext)
	const { isOpen, handleClose } = props

	const click = () => {
		handleClose()
		emptyCart()
	}

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h2">
						Su orden de compra ha sido realizada
					</Typography>
					<Typography>
						{JSON.stringify(
							props.cart.map((item) => ({ ...item }))
						)}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						En un lapso de 10 dias recibirá su producto.
					</Typography>
					<Link to="/">
						<Button onClick={click}>Aceptar</Button>
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
