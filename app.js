const axios = require('axios');

// Configurações da API do Zabbix
const zabbixApiUrl = 'http://192.168.100.147:443/api_jsonrpc.php'; // URL da api zabbix
const zabbixUser = 'Admin';
const zabbixPassword = 'As3!3.;ç90s';

// Dados de autenticação
const authData = {
  jsonrpc: '2.0',
  method: 'user.login',
  params: {
    user: zabbixUser,
    password: zabbixPassword,
  },
  id: 1,
};

// Variavel global para autenticacao
let authToken = null;

// Função para autenticar e obter o token de autenticação
const authenticate = async () => {
    const authData = {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
        user: zabbixUser,
        password: zabbixPassword,
      },
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, authData);
      authToken = response.data.result;
      console.log('Token de Autenticação:', authToken);

      getHosts();
      getCPUUsage();
      getMemoryUsage();
      getStorageUsage();
      getSwapSpace();
      getNetworkTraffic();
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }
  };


// Função para obter a lista de hosts
const getHosts = async () => {
    const requestData = {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: ['hostid', 'name'], // Especifica os campos que você deseja obter
      },
      auth: authToken,
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, requestData);
      const hosts = response.data.result;
      console.log('Nomes e IDs dos Hosts:');
      hosts.forEach(host => {
        console.log(`ID: ${host.hostid}, Nome: ${host.name}`);
      });
    } catch (error) {
      console.error('Erro ao obter nomes e IDs dos hosts:', error);
    }
  };
  

// Função para obter o uso de CPU
const getCPUUsage = async () => {
    const hostId = '10585'; // Substitua pelo ID do host desejado
    const itemKey = 'system.cpu.util'; // Substitua pela chave do item de CPU desejado
  
    const requestData = {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
        output: 'extend',
        hostids: hostId,
        search: {
          key_: itemKey,
        },
      },
      auth: authToken,
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, requestData);
      const cpuUsage = response.data.result[0].lastvalue;
      console.log('Uso de CPU:', cpuUsage);
    } catch (error) {
      console.error('Erro ao obter uso de CPU:', error);
    }
  };
  
  // Função para obter o uso de memória
  const getMemoryUsage = async () => {
    const hostId = '10585'; // Substitua pelo ID do host desejado
    const itemKey = 'vm.memory.size[total]'; // Substitua pela chave do item de memória desejado
  
    const requestData = {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
        output: 'extend',
        hostids: hostId,
        search: {
          key_: itemKey,
        },
      },
      auth: authToken,
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, requestData);
      const memoryUsage = response.data.result[0].lastvalue;
      console.log('Uso de Memória:', memoryUsage);
    } catch (error) {
      console.error('Erro ao obter uso de Memória:', error);
    }
  };
  
    
  // Funcao para obter o trafego de rede

  const getNetworkTraffic = async () => {
    const hostId = '10585';
    const itemKey = 'net.if.out["enp5s0"]';

    const requestData = {
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: 'extend',
          hostids: hostId,
          search: {
            key_: itemKey,
          },
        },
        auth: authToken,
        id: 1,
      };
    
      try {
        const response = await axios.post(zabbixApiUrl, requestData);
        const NetworkTraffic = response.data.result[0].lastvalue;
        console.log('Trafego de rede:', NetworkTraffic);
      } catch (error) {
        console.error('Erro ao obter Trafego de rede:', error);
      }
    };
    
  // Função para obter o uso de armazenamento
  const getStorageUsage = async () => {
    const hostId = '10585'; // Substitua pelo ID do host desejado
    const itemKey = 'vfs.fs.size[/,used]'; // Substitua pela chave do item de armazenamento desejado
  
    const requestData = {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
        output: 'extend',
        hostids: hostId,
        search: {
          key_: itemKey,
        },
      },
      auth: authToken,
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, requestData);
      const storageUsage = response.data.result[0].lastvalue;
      console.log('Uso de Armazenamento:', storageUsage);
    } catch (error) {
      console.error('Erro ao obter uso de Armazenamento:', error);
    }
  };
  
  // Função para obter o tráfego de rede
  const getSwapSpace = async () => {
    const hostId = '10585'; 
    const itemKey = 'system.swap.size[,total]';

    const requestData = {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
        output: 'extend',
        hostids: hostId,
        search: {
          key_: itemKey,
        },
      },
      auth: authToken,
      id: 1,
    };
  
    try {
      const response = await axios.post(zabbixApiUrl, requestData);
      const SwapSpace = response.data.result[0].lastvalue;
      console.log('Espaco de Swap:', SwapSpace);
    } catch (error) {
      console.error('Erro ao obter Tráfego de Rede:', error);
    }
  };
  






























// Chama a função de autenticação para definir o authToken global
authenticate();
