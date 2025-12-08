function backupData(){
  const data = {
    pelanggan: JSON.parse(localStorage.getItem('pelanggan') || '[]'),
    history: JSON.parse(localStorage.getItem('history') || '[]')
  };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'backup_paynet_biling.json';
  a.click();
  URL.revokeObjectURL(url);
}

function restoreData(){
  const input = document.getElementById('fileInput');
  if(!input.files.length){
    alert('Pilih file backup dulu');
    return;
  }
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    try{
      const data = JSON.parse(e.target.result);
      if(data.pelanggan) localStorage.setItem('pelanggan', JSON.stringify(data.pelanggan));
      if(data.history) localStorage.setItem('history', JSON.stringify(data.history));
      alert('Restore sukses. Silakan buka ulang halaman.');
    }catch(err){
      console.error(err);
      alert('File tidak valid');
    }
  };
  reader.readAsText(file);
}
