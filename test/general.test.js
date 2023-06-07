
import  { expect } from 'chai'

import { supabase } from '../src/bd/supabase.js';
import { User } from '../src/bd/user.js';


//Testeando la clase User
/*

1. Registramos un user
2. Abrimos sesion con el usuario
3. Cerramos sesión con el usuario
2. Registramos un perfil asociando el user_id
3. Registramos un proyecto asociando el user_id
4. Repetimos el proceso para cuatro usuarios, cada uno con su proyecto

5. Mediante un bucle cada usuario comentará un proyecto y pondrá una nota

6. Testing de toda la clase Perfil
7. Testing de toda la clase Proyecto
8. Testing de toda la clase Nota
*/