const appointmentsInfo = {
    "Cardiologia": {
        "Watson Juan": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
    },
    "Deportologia": {
        "Strange Esteban": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
    },
    "Traumatologia": {
        "House Gregorio": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
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
  
const allphisicians = [
{
    value: 1123,
    label: 'Dr.Watson',
    speciality: 'PDT'
},
{
    value: 1822,
    label: 'Dr.Strange',
    speciality: 'TRM'

},
{
    value: 1984,
    label: 'Dr.Brown',
    speciality: 'PSGY'
},
];
  
const someTakenAppExample = [
    {date: "2018-11-12",hour:"10", minutes:"00"},
    {date: "2018-11-12",hour:"13", minutes:"30"},
    {date: "2018-11-12",time:"16", minutes:"30"}
];

class ServerConnector {
    getAppointmentsInfo() {
        return appointmentsInfo;
    }
}

export default ServerConnector;