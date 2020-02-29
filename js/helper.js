var convertDate = date => {
    const bulan = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"   
        ];

        return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var jam = date.getHours();
    var menit = date.getMinutes();
    var format = jam >= 12 ? 'pm' : 'am';

    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;
    var newTime = jam + ':' + menit + ' ' + format;
    return newTime;
}