package com.rox.app.mirrors.core.entity;

import org.hibernate.annotations.GeneratorType;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * ͳһ����id��entity����.
 *
 * ����ͳһ����id����������������������ӳ�估���ɲ���
 * Oracleÿ��Entity��������id��SEQUCENCEʱ�����̳��ڱ������Ϊʵ��һ��Idable�Ľӿ�
 */
@MappedSuperclass
public abstract class IdEntity {

	protected int id;

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
