FROM python:3-alpine

# RUN apk add git

WORKDIR /usr/src/app

# COPY ./app/curses-menu/cursesmenu ./cursesmenu

# COPY ./app/requirements.txt ./ 
# RUN pip install --no-cache-dir -r requirements.txt

RUN apk add --no-cache openssh \
  && sed -i s/#PermitRootLogin.*/PermitRootLogin\ yes/ /etc/ssh/sshd_config \
  && echo "root:root" | chpasswd

COPY ./app .

RUN pip install -e curses-menu

COPY ./dockerfs/entrypoint.sh /
COPY ./dockerfs/profile /etc/profile

ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 22