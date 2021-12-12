import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import {getUserList} from './Api/getData'
import styled from 'styled-components';
import {
  Button
} from 'reactstrap';
import './App.css';

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<ClearButton type="button" onClick={onClear}>
			X
		</ClearButton>
	</>
);

const columns = [
  {
    /*name: 'Avatar',
    cell: row => <img height="30px" width="30px" alt={row.first_name} src={row.avatar} />,*/
    name: 'Id Dispositivo',
    selector: 'IdDispositivo',
  },
  {
    name: 'Nombre Dispositivo',
    selector: 'NombreDispositivo',
  },
  {
    name: 'Id Mensaje',
    selector: 'IdMensaje',
  },
  {
    name: 'Latitud',
    selector: 'Latitud',
  },
  {
    name: 'Longitud',
    selector: 'Longitud',
  },
  {
    name: 'Temperatura',
    selector: 'Temperatura',
  },
  {
    name: 'Baterias',
    selector: 'Baterias',
  },
  {
    name: 'Id Evento',
    selector: 'IdEvento',
  },  {
    name: 'Descripción Evento',
    selector: 'DescripcionEvento',
  },
  {
    name: 'Ciclando',
    selector: 'Ciclando',
  },
  {
    name: 'VAC',
    selector: 'VAC',
  },
  {
    name: 'IAC',
    selector: 'IAC',
  },  
  {
    name: 'VDC',
    selector: 'VDC',
  },
  {
    name: 'IDC',
    selector: 'IDC',
  },
  {
    name: 'Rele Ciclando',
    selector: 'ReleCiclando',
  },
  {
    name: 'Rele Auxiliar',
    selector: 'ReleAuxiliar',
  },
  {
    name: 'Horemetro VAC (H)',
    selector: 'HoremetroVAC',
  },  
  {
    name: 'Horemetro VDC (H)',
    selector: 'HoremetroIAC',
  },
  {
    name: 'Fecha Grabacion',
    selector: 'FechaGrabacion',
  }
];

function App() {
  const [users, setUsers] = useState({});
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [page, setPage] = useState(1);
  const countPerPage = 3;
 

  const filteredItems = users && users.length>0 ?users.filter(item => item.NombreDispositivo && item.NombreDispositivo.toLowerCase().includes(filterText.toLowerCase()),
  ):"";
   

  useEffect(() => {
    getUserList(page,countPerPage).then(res=>{
      console.log(res)
      setUsers(res);
    }).catch(err=>{
      setUsers({});
    });
  }, [page]);
 
  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);
  
  return (
    <div className="App">
      <h3>Lista de Dispositivos </h3>

      <DataTable
        title=""
        columns={columns}
        data={filteredItems}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={users.total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        subHeader
			  subHeaderComponent={subHeaderComponentMemo}
        onChangePage={page => setPage(page)}
      />
    </div>
  );
}

export default App;
