package com.middleware.SriCareUser.repository;

import com.middleware.SriCareUser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
}
