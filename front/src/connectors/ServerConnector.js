import axios from 'axios';

const url_specialties = 'http://localhost:5555/back/get_specialties';
const url_physicians = 'http://localhost:5555/back/get_physicians';
const url_dates = 'http://localhost:5555/back/get_dates';

const success = 200

const appointmentsInfo = {
  Cardiologia: {
    'Watson Juan': ['1995-12-17T03:24:00', '1995-12-17T03:24:00'],
  },
  Deportologia: {
    'Strange Esteban': ['1995-12-17T03:24:00', '1995-12-17T03:24:00'],
    'Brown Gustavo': ['1995-12-17T03:24:00', '1995-12-17T03:24:00'],
  },
  Traumatologia: {
    'House Gregorio': ['1995-12-17T03:24:00', '1995-12-17T03:24:00'],
  },
};

const allspecialities = [
  {
    value: 'CRD',
    label: 'Cardiology',
  },
  {
    value: 'TRM',
    label: 'Traumatology',
  },
  {
    value: 'PSGY',
    label: 'Plastic Surgery',
  },
  {
    value: 'PDT',
    label: 'Pediatrics',
  },
];

const allphysicians = [
  {
    value: 1123,
    label: 'Dr.Watson',
    speciality: 'PDT',
  },
  {
    value: 1822,
    label: 'Dr.Strange',
    speciality: 'TRM',
  },
  {
    value: 1984,
    label: 'Dr.Brown',
    speciality: 'PSGY',
  },
];

const someTakenAppExample = [
  { date: '2018-11-12', hour: '10', minutes: '00' },
  { date: '2018-11-12', hour: '13', minutes: '30' },
  { date: '2018-11-12', time: '16', minutes: '30' },
];

class ServerConnector {
  getSpecialities = () => {
    axios.get(url_specialties).then(res => {
        console.log(res);
        console.log(res.data);
        return res;
    });
        
    //return Object.keys(appointmentsInfo);
  };

  getPhysicians = speciality => {
    return Object.keys(appointmentsInfo[speciality]);
  };

  getDates = (speciality, physicians) => {
    return appointmentsInfo[speciality][physicians];
  };

  getAppointmentsInfo = () => {
    return appointmentsInfo;
  };
}

export default ServerConnector;
