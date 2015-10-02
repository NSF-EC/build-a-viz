##About

build a viz is a fork of the RAW-To-Viz project
- it adds zflower support
- has a branch for different instantiations (with appropriate changes to routes.js)


##Usage

##Installation

###Requirements

- [git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
- [Bower](http://bower.io/#installing-bower)

###Instructions

Clone 

``` sh
$ git clone https://github.com/NSF-EC/build-a-viz.git
```

browse to new root folder:

``` sh
$ cd build-a-viz
```

install client-side dependencies:

``` sh
$ bower install
```
	
You can now run a local web server. For example, you can run Python's built-in server:

``` sh
$ python -m SimpleHTTPServer 4000
```

or for Python 3+

``` sh
$ python -m http.server 4000
```

Once this is running, go to [http://localhost:4000/](http://localhost:4000/).


##Documentation and Support


##Charts


##Libraries

- # see https://github.com/NSF-EC/zflowers.git
- # zlib can be either a submodule or a soft link to the zflower project
- # e.g. zflib@ -> ../zflowers/languages


##Roadmap


##License

	Copyright (c), 2015-2017 Michael Haberman
	
	<mikeh.hasmail@gmail.com>  
	 
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	 
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Lesser General Public License for more details.
	 
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
