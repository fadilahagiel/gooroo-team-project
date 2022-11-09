import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>


      <div className='text-center p-3 text-light' style={{ backgroundColor: '#0A182F' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-light' href='https://mdbootstrap.com/'>
          Gooroo Team
        </a>
      </div>
    </MDBFooter>
  );
}