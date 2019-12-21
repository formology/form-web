FROM node:8
ARG processNameArg
ARG sshKey
ENV processName=${processNameArg}

WORKDIR /usr/src/app
RUN mkdir /root/.ssh/
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts
RUN echo "${sshKey}" > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN git clone git@gitlab.com:nadan-org/nadan-web.git

WORKDIR /usr/src/app/nadan-web
RUN yarn setup
EXPOSE 3002

CMD node ./scripts/launcher.js --process ${processName}
